import {
  workspace
} from "coc.nvim";
import {
  Position,
  Range,
} from "vscode-languageserver-protocol";
import Uri from "vscode-uri";

const window = workspace;

export async function jumpToUriAtPosition(
    uri: Uri, position: Position, preserveFocus: boolean) {
  const d = await workspace.openResource(uri.toString());
  // const editor = window.activeTextEditor;
  // if (!editor) {
  //   console.log("!editor");
  //   return;
  // }
  if (!d) {
    // editor.revealRange(new Range(position, position), TextEditorRevealType.InCenter);
    // editor.selection = new Selection(position, position);
  } else {
  //   const e = await window.showTextDocument(d, undefined, preserveFocus);
  //   e.revealRange(
  //       new Range(position, position), TextEditorRevealType.InCenter);
  //   e.selection = new Selection(position, position);
  }
}
