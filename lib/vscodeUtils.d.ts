import { Position } from "vscode-languageserver-protocol";
import Uri from "vscode-uri";
export declare function jumpToUriAtPosition(uri: Uri, position: Position, preserveFocus: boolean): Promise<void>;
