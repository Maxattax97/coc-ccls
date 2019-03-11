import { CloseAction, ErrorAction, ErrorHandler, workspace, WorkspaceConfiguration} from 'coc.nvim';
import { Message } from 'vscode-jsonrpc';
// import { Error } from 'vscode-languageserver-protocol';
// import { CloseAction, ErrorAction, ErrorHandler} from 'vscode-languageclient';
import { logChan } from './globalContext';

export class Error {
  // Not actually used, so we leave a blank implementation.
}

export class CclsErrorHandler implements ErrorHandler {
  constructor(readonly config: WorkspaceConfiguration) {}

  public error(error: Error, message: Message, count: number): ErrorAction {
    logChan(`ccls error (count ${count}): ${message}`);
    return ErrorAction.Continue;
  }

  public closed(): CloseAction {
    logChan(`ccls server connection was closed`);
    const notifyOnCrash = this.config.get('launch.notifyOnCrash');
    const restart = this.config.get('launch.autoRestart');

    if (notifyOnCrash) {
      workspace.showMessage(
          restart ? 'ccls has crashed; it has been restarted.' :
                    'ccls has crashed; it has not been restarted.');
      // window.showInformationMessage(
      //     restart ? 'ccls has crashed; it has been restarted.' :
      //               'ccls has crashed; it has not been restarted.');
    }

    if (restart)
      return CloseAction.Restart;
    return CloseAction.DoNotRestart;
  }
}
