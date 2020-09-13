/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as ChildProcess from "child_process";

export class AlloyIntegration {

	public static open(path: string): void {
		ChildProcess.execFileSync("java", ["-jar", __dirname + "/integration.jar", path]);
	}
}
