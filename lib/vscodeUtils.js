"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = require("coc.nvim");
const window = coc_nvim_1.workspace;
function jumpToUriAtPosition(uri, position, preserveFocus) {
    return __awaiter(this, void 0, void 0, function* () {
        const d = yield coc_nvim_1.workspace.openResource(uri.toString());
        // const editor = window.activeTextEditor;
        // if (!editor) {
        //   console.log("!editor");
        //   return;
        // }
        if (!d) {
            // editor.revealRange(new Range(position, position), TextEditorRevealType.InCenter);
            // editor.selection = new Selection(position, position);
        }
        else {
            //   const e = await window.showTextDocument(d, undefined, preserveFocus);
            //   e.revealRange(
            //       new Range(position, position), TextEditorRevealType.InCenter);
            //   e.selection = new Selection(position, position);
        }
    });
}
exports.jumpToUriAtPosition = jumpToUriAtPosition;
//# sourceMappingURL=vscodeUtils.js.map