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
        this._cache = [];
        this._process = ChildProcess.spawn("java", ["-jar", __dirname + "/blockloy-alloy-integration.jar", path]);
        this._process.stderr.on("data", this.onStdErr.bind(this));
        this._process.stdout.on("data", this.onStdOut.bind(this));
        this._process.on("close", this.onClose.bind(this));
    }
    onClose(code) {
        if (code === 2) {
            const raw = this._cache.join("");
            console.log(raw);
            const obj = JSON.parse(raw);
            console.error(obj);
            this._window.webContents.send("handle-error-compile", obj);
            this._cache.splice(0, this._cache.length);
        }
    }
    onStdErr(data) {
        const msg = data.toString();
        console.error(msg);
        this._window.webContents.send("handle-error-run");
    }
    onStdOut(data) {
        console.log(data.toString());
        this._cache.push(data.toString());
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