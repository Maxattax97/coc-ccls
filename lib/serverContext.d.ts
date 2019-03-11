import { Disposable } from "vscode-languageserver-protocol";
/** instance represents running instance of ccls */
export declare class ServerContext implements Disposable {
    readonly cwd: string;
    private client;
    private clientPid?;
    private cliConfig;
    private ignoredConf;
    private _dispose;
    private lastGoto;
    constructor(cwd: string, lazyMode?: boolean);
    dispose(): any[];
    start(): Promise<void>;
    stop(): Promise<void>;
    private reloadIndex;
    private onDidChangeConfiguration;
    private provideCodeLens;
    private initClient;
    private makeRefHandler;
    private showReferencesCmd;
    private gotoCmd;
    private fixItCmd;
    private autoImplementCmd;
    private insertIncludeCmd;
    private gotoForTreeView;
    private hackGotoForTreeView;
    private makeNavigateHandler;
}
