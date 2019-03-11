"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = require("coc.nvim");
const path = __importStar(require("path"));
const util = __importStar(require("util"));
const vscode_uri_1 = __importDefault(require("vscode-uri"));
function resourcePath(...paths) {
    return path.join(__dirname, "..", "resources", ...paths);
}
exports.resourcePath = resourcePath;
function unwrap(value, tip = "?") {
    if (value === undefined)
        throw new Error("undefined " + tip);
    return value;
}
exports.unwrap = unwrap;
function disposeAll(items) {
    return items.reverse().map((d) => d.dispose());
}
exports.disposeAll = disposeAll;
function normalizeUri(u) {
    return vscode_uri_1.default.parse(u).toString(true);
}
exports.normalizeUri = normalizeUri;
function setContext(name, value) {
    coc_nvim_1.commands.executeCommand("setContext", name, value);
}
exports.setContext = setContext;
function dedent(templateStrings, ...args) {
    const strings = templateStrings.map((value) => value.replace(/\r?\n[ ]*$/, '\n'));
    let result = strings[0];
    for (let i = 0; i < args.length; i++) {
        result += args[i] + strings[i + 1];
    }
    return result;
}
exports.dedent = dedent;
const setTimeoutPromised = util.promisify(setTimeout);
function wait(millisecs) {
    return __awaiter(this, void 0, void 0, function* () {
        return setTimeoutPromised(millisecs);
    });
}
exports.wait = wait;
//# sourceMappingURL=utils.js.map