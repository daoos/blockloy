/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./index.css";
import {TopBar} from "./topBar/TopBar";
import "./App.css";
import {Remote} from "electron";
const remote: Remote = window.require("electron").remote;
const ipcRenderer = window.require("electron").ipcRenderer;
const fs = window.require("fs");

export interface AppProps {

}

export interface AppState {
	value: string;
}

export class App extends React.Component<AppProps, AppState> {

	public constructor(props: AppProps) {

		super(props);
		this.state = {value: ""};
		this.handleTextAreaOnChange = this.handleTextAreaOnChange.bind(this);
		this.handleLoad = this.handleLoad.bind(this);
		this.handleCompile = this.handleCompile.bind(this);

	}

	private handleTextAreaOnChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
		this.setState({value: ev.target.value});
	}

	private handleLoad(): void {
		const path: string[] | undefined = remote.dialog.showOpenDialogSync({properties: ["openFile"], filters: [{
			name: "*",
				extensions: ["als"]
			}]})
		if (!path) return;
		const filePath: string = path[0];
		if (!filePath) return;
		if (!fs.existsSync(filePath)) return;
		const data: Buffer | undefined = fs.readFileSync(filePath);
		if (!data) return;
		const str = data.toString("utf8");
		this.setState({value: str});
	}

	private handleCompile(): void {
		fs.writeFileSync("/tmp/blockloy.als", this.state.value);
		ipcRenderer.invoke("open-alloy", "/tmp/blockloy.als").catch(console.error);
	}

	public render(): React.ReactElement {

		return (<div className={"App"}>
			<TopBar/>
			<div className={"main"}>
				<textarea onChange={this.handleTextAreaOnChange} className={"editor"} value={this.state.value}/>
			</div>
			<div className={"bottomBar"}>
				<button onClick={this.handleLoad} className={"load"}>Load</button>
				<button onClick={this.handleCompile} className={"compile"}>Compile</button>
			</div>
		</div>);

	}

	public static main(): void {

	}
}
