import { Disposable, Range } from "vscode-languageserver-protocol";
import { SymbolKind } from "vscode-languageserver-types";
declare enum CclsSymbolKind {
    TypeAlias = 252,
    Parameter = 253,
    StaticMethod = 254,
    Macro = 255
}
declare enum StorageClass {
    Invalid = 0,
    None = 1,
    Extern = 2,
    Static = 3,
    PrivateExtern = 4,
    Auto = 5,
    Register = 6
}
interface SemanticSymbol {
    readonly id: number;
    readonly parentKind: SymbolKind;
    readonly kind: SymbolKind;
    readonly isTypeMember: boolean;
    readonly storage: StorageClass;
    readonly lsRanges: Range[];
}
export interface PublishSemanticHighlightArgs {
    readonly uri: string;
    readonly symbols: SemanticSymbol[];
}
export declare const semanticTypes: {
    [name: string]: Array<SymbolKind | CclsSymbolKind>;
};
export declare class SemanticContext implements Disposable {
    private semanticEnabled;
    private _dispose;
    constructor();
    dispose(): void;
    publishSemanticHighlight(args: PublishSemanticHighlightArgs): void;
    private updateConfigValues;
}
export {};
