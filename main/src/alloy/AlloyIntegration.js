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
    static open(path) {
        ChildProcess.execFileSync("java", ["-jar", __dirname + "/integration.jar", path]);
    }
}
exports.AlloyIntegration = AlloyIntegration;
//# sourceMappingURL=AlloyIntegration.js.map