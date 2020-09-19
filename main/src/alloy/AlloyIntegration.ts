/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as ChildProcess from "child_process";

export class AlloyIntegration {

	private readonly _process: ChildProcess.ChildProcessWithoutNullStreams;

	public constructor(path: string) {
		this._process = ChildProcess.spawn("java", ["-jar", __dirname + "/integration.jar", path]);
		this._process.stderr.on("data", this.onStdErr.bind(this));
		this._process.stdout.on("data", this.onStdOut.bind(this));
	}

	private onStdErr(data: any): void {
		console.error(data.toString());
	}

	private onStdOut(data: any): void {
		console.log(data.toString());
	}

	public stop(): void {
		this._process.kill();
	}

	public write(data: Buffer | string): void {
		this._process.stdin.write(data);
	}

}
