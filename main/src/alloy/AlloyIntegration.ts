/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as ChildProcess from "child_process";
import {BrowserWindow} from "electron";

export class AlloyIntegration {

	private readonly _process: ChildProcess.ChildProcessWithoutNullStreams;
	private readonly _window: BrowserWindow;

	public constructor(path: string, window: BrowserWindow) {
		this._window = window;
		this._process = ChildProcess.spawn("java", ["-jar", __dirname + "/integration.jar", path]);
		this._process.stderr.on("data", this.onStdErr.bind(this));
		this._process.stdout.on("data", this.onStdOut.bind(this));
	}

	private onStdErr(data: any): void {
		const msg = data.toString();
		console.error(msg);
		if (msg.includes("Model was not satisfiable.")) {
			this._window.webContents.send("handle-error-compile");
		}
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
