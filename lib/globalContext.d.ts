import { OutputChannel } from 'coc.nvim';
import { Disposable } from 'vscode-languageserver-protocol';
export declare let cclsChan: OutputChannel | undefined;
export declare function logChan(msg: string): void;
export declare class GlobalContext implements Disposable {
    readonly chan: OutputChannel;
    private _dispose;
    private _server;
    private _isRunning;
    private _srvCwd;
    constructor();
    dispose(): Promise<void>;
    startServer(): Promise<void>;
    private stopServer;
    private restartCmd;
}
