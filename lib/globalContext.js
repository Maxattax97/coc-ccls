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
const serverContext_1 = require("./serverContext");
const utils_1 = require("./utils");
function logChan(msg) {
    if (!exports.cclsChan) {
        console.error('!! ' + msg);
        return;
    }
    exports.cclsChan.appendLine(msg);
}
exports.logChan = logChan;
class GlobalContext {
    constructor() {
        this._dispose = [];
        this._isRunning = false;
        this.chan = coc_nvim_1.workspace.createOutputChannel('ccls');
        exports.cclsChan = this.chan;
        this._dispose.push(this.chan);
        const wss = coc_nvim_1.workspace.workspaceFolder;
        // if (!wss || wss.length === 0)
        if (!wss)
            throw Error("No workspace opened");
        // this._srvCwd = wss[0].uri.fsPath;
        this._srvCwd = wss.uri;
        logChan(`Server CWD is ${this._srvCwd}`);
        this._server = new serverContext_1.ServerContext(this._srvCwd);
        this._dispose.push(coc_nvim_1.commands.registerCommand('ccls.restart', () => __awaiter(this, void 0, void 0, function* () { return this.restartCmd(); })));
        this._dispose.push(coc_nvim_1.commands.registerCommand('ccls.restartLazy', () => __awaiter(this, void 0, void 0, function* () { return this.restartCmd(true); })));
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.disposeAll(this._dispose);
            return this.stopServer();
        });
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isRunning)
                throw new Error("Server is already running");
            yield this._server.start();
            this._isRunning = true;
        });
    }
    stopServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isRunning) {
                this._isRunning = false;
                yield this._server.stop();
                this._server.dispose();
            }
        });
    }
    restartCmd(lazy = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stopServer();
            this._server = new serverContext_1.ServerContext(this._srvCwd, lazy);
            this.chan.appendLine(`Restarting ccls, lazy mode ${lazy ? 'on' : 'off'}`);
            return this.startServer();
        });
    }
}
exports.GlobalContext = GlobalContext;
//# sourceMappingURL=globalContext.js.map