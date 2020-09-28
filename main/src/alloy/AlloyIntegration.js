"use strict";
/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlloyIntegration = void 0;
const ChildProcess = require("child_process");
class AlloyIntegration {
    constructor(path, window) {
        this._window = window;
        this._process = ChildProcess.spawn("java", ["-jar", __dirname + "/integration.jar", path]);
        this._process.stderr.on("data", this.onStdErr.bind(this));
        this._process.stdout.on("data", this.onStdOut.bind(this));
    }
    onStdErr(data) {
        const msg = data.toString();
        console.error(msg);
        if (msg.includes("Model was not satisfiable.")) {
            this._window.webContents.send("handle-error-compile");
        }
    }
    onStdOut(data) {
        console.log(data.toString());
    }
    stop() {
        this._process.kill();
    }
    write(data) {
        this._process.stdin.write(data);
    }
}
exports.AlloyIntegration = AlloyIntegration;
//# sourceMappingURL=AlloyIntegration.js.map