import { LanguageClient } from "coc.nvim";
import { Disposable } from "vscode-languageserver-protocol";
export declare class InactiveRegionsProvider implements Disposable {
    private client;
    private skippedRanges;
    private _dispose;
    constructor(client: LanguageClient);
    dispose(): void;
    private onSkippedRanges;
}
