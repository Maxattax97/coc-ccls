import { LanguageClient } from "coc.nvim";
import { Disposable } from "vscode-jsonrpc";
export declare class StatusBarIconProvider implements Disposable {
    private client;
    private updateInterval;
    private icon;
    private timer;
    private wasError;
    constructor(client: LanguageClient, updateInterval: number);
    dispose(): void;
    private updateStatus;
}
