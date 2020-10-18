/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/nord.css';
import CodeMirror from "codemirror";
import "./index.css";
import "./App.css";

const ipcRenderer = window.require("electron").ipcRenderer;
const fs = window.require("fs");

function hideAlert() {
	const alert = document.getElementById("alert");
	if (!alert) return;
	alert.style.display = "none";
}

function showAlert(message: string) {

	const alertContent = document.getElementById("alert-content");
	if (!alertContent) return;
	alertContent.innerHTML = message;

	const alert = document.getElementById("alert");
	if (!alert) return;
	alert.style.display = "flex";

}

function setupAlert() {
	const alertElement = document.getElementById("alert");
	if (!alertElement) return;
	alertElement.style.display = "none";
	alertElement.onclick = () => {
		hideAlert();
	};
}

function main() {
	const div = document.getElementById("editor");
	if (!div) return;
	const editor: CodeMirror.Editor = CodeMirror(div, {
		mode: {name: "javascript", json: true},
		theme: "nord",
		lineNumbers: true,
		lineWrapping: true,
		spellcheck: true,
		smartIndent: true,
		indentUnit: 4,
		indentWithTabs: true,
		// readOnly: "nocursor",
		electricChars: true
	});

	ipcRenderer.on("set", (event, message) => {
		editor.setValue(message);
	})

	ipcRenderer.on("get-save", () => {
		ipcRenderer.invoke("get-save", editor.getValue()).catch(console.error);
	});

	ipcRenderer.on("get-run", () => {
		ipcRenderer.invoke("get-run", editor.getValue()).catch(console.error);
	});

	ipcRenderer.on("handle-error-run", () => {
		alert("Source code incorrect. Failed to compile.")
	});

	ipcRenderer.on("handle-error-compile", (event, error: {msg: string, x1: number, x2: number, y1: number, y2: number}) => {
		editor.setCursor(error.y1-1, error.x1 -1, {scroll: true});
		showAlert(error.msg);
		editor.markText({ch: error.x1 - 1, line: error.y1-1}, {ch: error.x2, line: error.y1 -1}, {css: "background: red;"});
	});

	setupAlert();

}

window.onload = main;
