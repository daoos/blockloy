/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import {Controlled as CodeMirror} from "react-codemirror2";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/nord.css';
import "./index.css";
import "./App.css";
import {Remote} from "electron";
import {Blockly} from "./blockly/Blockly";
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
		this.handleCompile = this.handleCompile.bind(this);

	}

	public componentDidMount() {
		ipcRenderer.on("handle-open", (event, message) => {
			this.setState({value: message});
		})

		ipcRenderer.on("handle-run", () => {
			fs.writeFileSync("/tmp/blockloy.als", this.state.value);
			ipcRenderer.invoke("open-alloy", "/tmp/blockloy.als").catch(console.error);
		});

		ipcRenderer.on("handle-error-compile", () => {
			alert("Source code incorrect. Failed to compile.")
		});
	}

	private handleTextAreaOnChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
		this.setState({value: ev.target.value});
	}


	private handleCompile(): void {

	}

	public render(): React.ReactElement {

		return (<div className={"App"}>
			<div className={"main"}>
				<CodeMirror
					className={"editor"}
					value={this.state.value}
					options={{
						mode: {name: "javascript", json: true},
						theme: "nord",
						lineNumbers: true,
						lineWrapping: true,
						spellcheck: true,
						smartIndent: true,
						indentUnit: 4,
						indentWithTabs: true,
						readOnly: "nocursor",
						electricChars: true
					}}
					onBeforeChange={(editor, data, value) => {
						this.setState({value});
					}}
					onChange={(editor, data, value) => {

					}}
				/>
				{/*<Blockly/>*/}
			</div>
			<div className={"bottomBar"}/>
		</div>);

	}

	public static main(): void {

	}
}
