"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = require("coc.nvim");
// import { Error } from 'vscode-languageserver-protocol';
// import { CloseAction, ErrorAction, ErrorHandler} from 'vscode-languageclient';
const globalContext_1 = require("./globalContext");
class Error {
}
exports.Error = Error;
class CclsErrorHandler {
    constructor(config) {
        this.config = config;
    }
    error(error, message, count) {
        globalContext_1.logChan(`ccls error (count ${count}): ${message}`);
        return coc_nvim_1.ErrorAction.Continue;
    }
    closed() {
        globalContext_1.logChan(`ccls server connection was closed`);
        const notifyOnCrash = this.config.get('launch.notifyOnCrash');
        const restart = this.config.get('launch.autoRestart');
        if (notifyOnCrash) {
            coc_nvim_1.workspace.showMessage(restart ? 'ccls has crashed; it has been restarted.' :
                'ccls has crashed; it has not been restarted.');
            // window.showInformationMessage(
            //     restart ? 'ccls has crashed; it has been restarted.' :
            //               'ccls has crashed; it has not been restarted.');
        }
        if (restart)
            return coc_nvim_1.CloseAction.Restart;
        return coc_nvim_1.CloseAction.DoNotRestart;
    }
}
exports.CclsErrorHandler = CclsErrorHandler;
//# sourceMappingURL=cclsErrorHandler.js.map