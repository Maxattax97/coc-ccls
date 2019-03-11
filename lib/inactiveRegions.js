"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = require("coc.nvim");
const utils_1 = require("./utils");
const window = coc_nvim_1.workspace;
class InactiveRegionsProvider {
    constructor(client) {
        // const config = workspace.getConfiguration('ccls');
        // this.decorationType = window.createTextEditorDecorationType({
        //   dark: {
        //     backgroundColor: config.get('theme.dark.skippedRange.backgroundColor'),
        //     color: config.get('theme.dark.skippedRange.textColor'),
        //   },
        //   isWholeLine: true,
        //   light: {
        //     backgroundColor: config.get('theme.light.skippedRange.backgroundColor'),
        //     color: config.get('theme.light.skippedRange.textColor'),
        //   },
        //   rangeBehavior: DecorationRangeBehavior.ClosedClosed
        // });
        this.client = client;
        this.skippedRanges = new Map();
        this._dispose = [];
        // await this.client.onReady();
        this.client.onNotification("$ccls/publishSkippedRanges", (args) => this.onSkippedRanges(args));
        // this._dispose.push(
        //   window.onDidChangeActiveTextEditor((editor) => this.onChangeTextEditor(editor))
        // );
        // This only got called during dispose, which perfectly matches our goal.
        this._dispose.push(coc_nvim_1.workspace.onDidCloseTextDocument((document) => this.skippedRanges.delete(document.uri.toString())));
    }
    dispose() {
        utils_1.disposeAll(this._dispose);
    }
    // private onChangeTextEditor(editor?: TextEditor) {
    //   if (!editor)
    //     return;
    //   const uri = editor.document.uri.toString(true);
    //   const range = this.skippedRanges.get(uri);
    //   if (range) {
    //     editor.setDecorations(this.decorationType, range);
    //   }
    // }
    onSkippedRanges({ uri, skippedRanges }) {
        // uri = normalizeUri(uri);
        // let ranges = skippedRanges
        //   .map(this.client.protocol2CodeConverter.asRange)
        //   .filter((e: Range | undefined) => e !== undefined) as Range[];
        // ranges = ranges.map((range) => {
        //   if (range.isEmpty || range.isSingleLine) return range;
        //   return range.with({ end: range.end.translate(-1, 23333) });
        // });
        // this.skippedRanges.set(uri, ranges);
        // window.visibleTextEditors
        //   .filter((editor) => editor.document.uri.toString(true) === uri)
        //   .forEach((editor) => editor.setDecorations(this.decorationType, ranges));
    }
}
exports.InactiveRegionsProvider = InactiveRegionsProvider;
//# sourceMappingURL=inactiveRegions.js.map