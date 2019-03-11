import { CloseAction, ErrorAction, ErrorHandler, WorkspaceConfiguration } from 'coc.nvim';
import { Message } from 'vscode-jsonrpc';
export declare class Error {
}
export declare class CclsErrorHandler implements ErrorHandler {
    readonly config: WorkspaceConfiguration;
    constructor(config: WorkspaceConfiguration);
    error(error: Error, message: Message, count: number): ErrorAction;
    closed(): CloseAction;
}
