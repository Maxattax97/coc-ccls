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
const globalContext_1 = require("./globalContext");
const utils_1 = require("./utils");
const window = coc_nvim_1.workspace;
class StatusBarIconProvider {
    constructor(client, updateInterval) {
        this.client = client;
        this.updateInterval = updateInterval;
        this.wasError = false;
        this.icon = window.createStatusBarItem();
        this.icon.text = "ccls: loading";
        // this.icon.tooltip = "ccls is starting / loading project metadata";
        this.icon.show();
        this.timer = setInterval(this.updateStatus.bind(this), updateInterval);
    }
    dispose() {
        clearInterval(this.timer);
        this.icon.dispose();
    }
    updateStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            let info;
            try {
                info = yield this.client.sendRequest("$ccls/info");
                this.wasError = false;
            }
            catch (e) {
                if (this.wasError)
                    return;
                this.wasError = true;
                this.icon.text = "ccls: error";
                // this.icon.color = "red";
                // this.icon.tooltip = "Failed to perform info request: " + (e as Error).message;
                utils_1.unwrap(globalContext_1.cclsChan).show();
                return;
            }
            // this.icon.color = "";
            this.icon.text = `ccls: ${info.pipeline.pendingIndexRequests || 0} jobs`;
            // this.icon.tooltip = dedent`${info.db.files} files,
            //   ${info.db.funcs} functions,
            //   ${info.db.types} types,
            //   ${info.db.vars} variables,
            //   ${info.project.entries} entries in project.
            //
            //   ${info.pipeline.pendingIndexRequests} pending index requests`;
        });
    }
}
exports.StatusBarIconProvider = StatusBarIconProvider;
//# sourceMappingURL=statusBarIcon.js.map