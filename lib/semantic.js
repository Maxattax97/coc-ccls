"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = require("coc.nvim");
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const utils_1 = require("./utils");
const window = coc_nvim_1.workspace;
var CclsSymbolKind;
(function (CclsSymbolKind) {
    // ls.SymbolKind ccls extensions
    CclsSymbolKind[CclsSymbolKind["TypeAlias"] = 252] = "TypeAlias";
    CclsSymbolKind[CclsSymbolKind["Parameter"] = 253] = "Parameter";
    CclsSymbolKind[CclsSymbolKind["StaticMethod"] = 254] = "StaticMethod";
    CclsSymbolKind[CclsSymbolKind["Macro"] = 255] = "Macro";
})(CclsSymbolKind || (CclsSymbolKind = {}));
var StorageClass;
(function (StorageClass) {
    StorageClass[StorageClass["Invalid"] = 0] = "Invalid";
    StorageClass[StorageClass["None"] = 1] = "None";
    StorageClass[StorageClass["Extern"] = 2] = "Extern";
    StorageClass[StorageClass["Static"] = 3] = "Static";
    StorageClass[StorageClass["PrivateExtern"] = 4] = "PrivateExtern";
    StorageClass[StorageClass["Auto"] = 5] = "Auto";
    StorageClass[StorageClass["Register"] = 6] = "Register";
})(StorageClass || (StorageClass = {}));
// function makeSemanticDecorationType(
//   color: string|undefined, underline: boolean, italic: boolean,
//   bold: boolean): TextEditorDecorationType {
//   const opts: DecorationRenderOptions = {};
//   opts.rangeBehavior = DecorationRangeBehavior.ClosedClosed;
//   opts.color = color;
//   if (underline === true)
//     opts.textDecoration = 'underline';
//   if (italic === true)
//     opts.fontStyle = 'italic';
//   if (bold === true)
//     opts.fontWeight = 'bold';
//   return window.createTextEditorDecorationType(
//       opts as DecorationRenderOptions);
// }
exports.semanticTypes = {
    enumConstants: [vscode_languageserver_types_1.SymbolKind.EnumMember],
    enums: [vscode_languageserver_types_1.SymbolKind.Enum],
    freeStandingFunctions: [vscode_languageserver_types_1.SymbolKind.Function],
    freeStandingVariables: [],
    globalVariables: [],
    macros: [CclsSymbolKind.Macro],
    memberFunctions: [vscode_languageserver_types_1.SymbolKind.Method, vscode_languageserver_types_1.SymbolKind.Constructor],
    memberVariables: [vscode_languageserver_types_1.SymbolKind.Field],
    namespaces: [vscode_languageserver_types_1.SymbolKind.Namespace],
    parameters: [CclsSymbolKind.Parameter],
    staticMemberFunctions: [CclsSymbolKind.StaticMethod],
    staticMemberVariables: [],
    templateParameters: [vscode_languageserver_types_1.SymbolKind.TypeParameter],
    typeAliases: [CclsSymbolKind.TypeAlias],
    types: [vscode_languageserver_types_1.SymbolKind.Class, vscode_languageserver_types_1.SymbolKind.Struct],
};
// function makeDecorations(type: string) {
//   const config = workspace.getConfiguration('ccls');
//   let colors = config.get(`highlighting.colors.${type}`, [undefined]);
//   if (colors.length === 0)
//     colors = [undefined];
//   const u = config.get(`highlighting.underline.${type}`, false);
//   const i = config.get(`highlighting.italic.${type}`, false);
//   const b = config.get(`highlighting.bold.${type}`, false);
//   return colors.map((c) => makeSemanticDecorationType(c, u, i, b));
// }
// TODO: enable bold/italic decorators, might need change in vscode
class SemanticContext {
    constructor() {
        // private semanticDecorations = new Map<string, TextEditorDecorationType[]>();
        this.semanticEnabled = new Map();
        // private cachedDecorations = new Map<string, Map<TextEditorDecorationType, Array<Range>>>();
        this._dispose = [];
        for (const type of Object.keys(exports.semanticTypes)) {
            // this.semanticDecorations.set(type, makeDecorations(type));
            this.semanticEnabled.set(type, false);
        }
        this.updateConfigValues();
        // workspace.onDidChangeActiveTextEditor(
        //   (editor?: TextEditor) => {
        //     if (editor) {
        //       this.updateDecoration(editor);
        //     }
        //   },
        //   undefined,
        //   this._dispose
        // );
    }
    dispose() {
        utils_1.disposeAll(this._dispose);
    }
    publishSemanticHighlight(args) {
        this.updateConfigValues();
        const normUri = utils_1.normalizeUri(args.uri);
        // for (const visibleEditor of window.visibleTextEditors) {
        //   if (normUri !== visibleEditor.document.uri.toString(true))
        //     continue;
        //
        //   const decorations = new Map<TextEditorDecorationType, Array<Range>>();
        //
        //   for (const symbol of args.symbols) {
        //     const type = this.tryFindDecoration(symbol);
        //     if (!type)
        //       continue;
        //     const existing = decorations.get(type);
        //     if (existing) {
        //       for (const range of symbol.lsRanges) {
        //         existing.push(range);
        //       }
        //     } else {
        //       decorations.set(type, symbol.lsRanges);
        //     }
        //   }
        // TODO limit cache size
        // this.cachedDecorations.set(normUri, decorations);
        // this.updateDecoration(visibleEditor);
        // }
    }
    updateConfigValues() {
        // Fetch new config instance, since vscode will cache the previous one.
        const config = coc_nvim_1.workspace.getConfiguration('ccls');
        for (const [name, _value] of this.semanticEnabled) {
            this.semanticEnabled.set(name, config.get(`highlighting.enabled.${name}`, false));
        }
    }
}
exports.SemanticContext = SemanticContext;
//# sourceMappingURL=semantic.js.map