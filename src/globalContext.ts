import { commands, OutputChannel, workspace } from 'coc.nvim';
import { Disposable } from 'vscode-languageserver-protocol';
import { ServerContext } from "./serverContext";
import { disposeAll } from "./utils";

export let cclsChan: OutputChannel|undefined;

export function logChan(msg: string) {
  if (!cclsChan) {
    console.error('!! ' + msg);
    return;
  }
  cclsChan.appendLine(msg);
}

export class GlobalContext implements Disposable {
  public readonly chan: OutputChannel;
  private _dispose: Disposable[] = [];
  private _server: ServerContext;
  private _isRunning = false;
  private _srvCwd: string;
  public constructor(
  ) {
    this.chan = workspace.createOutputChannel('ccls');
    cclsChan = this.chan;
    this._dispose.push(this.chan);

    const wss = workspace.workspaceFolder;
    // if (!wss || wss.length === 0)
    if (!wss)
      throw Error("No workspace opened");
    // this._srvCwd = wss[0].uri.fsPath;
    this._srvCwd = wss.uri;
    logChan(`Server CWD is ${this._srvCwd}`);

    this._server = new ServerContext(this._srvCwd);
    this._dispose.push(commands.registerCommand('ccls.restart', async () => this.restartCmd()));
    this._dispose.push(commands.registerCommand('ccls.restartLazy', async () => this.restartCmd(true)));
  }

  public async dispose() {
    disposeAll(this._dispose);
    return this.stopServer();
  }

  public async startServer() {
    if (this._isRunning)
      throw new Error("Server is already running");
    await this._server.start();
    this._isRunning = true;
  }

  private async stopServer() {
    if (this._isRunning) {
      this._isRunning = false;
      await this._server.stop();
      this._server.dispose();
    }
  }

  private async restartCmd(lazy: boolean = false) {
    await this.stopServer();
    this._server = new ServerContext(this._srvCwd, lazy);
    this.chan.appendLine(`Restarting ccls, lazy mode ${lazy ? 'on' : 'off'}`);
    return this.startServer();
  }
}
