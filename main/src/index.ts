/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {BrowserWindow, app, ipcMain, Menu, MenuItemConstructorOptions, MenuItem, dialog, ipcRenderer} from "electron";
import * as fs from "fs";
import {AlloyIntegration} from "./alloy/AlloyIntegration";

let file: string = "";

async function createWindow () {

	const dimensions = {
		width: 1280,
		height: 720
	};

	const window = new BrowserWindow({
		width: dimensions.width,
		height: dimensions.height,
		minWidth: dimensions.width,
		minHeight: dimensions.height,
		webPreferences: {nodeIntegration: true}
	});

	const template: Array<(MenuItemConstructorOptions) | (MenuItem)> = [
		{
			label: "Blockloy",
			submenu: [
				{role: "quit"}
			]
		},
		{
			label: "File",
			submenu: [
				{
					label: "Open",
					accelerator: "CmdOrCtrl+O",
					click: async () => {
						const path: string[] | undefined = dialog.showOpenDialogSync({properties: ["openFile"], filters: [{
								name: "*",
								extensions: ["als"]
						}]});
						if (!path) return;
						const filePath: string = path[0];
						if (!filePath) return;
						if (!fs.existsSync(filePath)) return;
						const data: Buffer | undefined = fs.readFileSync(filePath);
						if (!data) return;
						file = filePath;
						const str = data.toString("utf8");
						window.webContents.send("set", str);
						const parts: string[] = filePath.split("/");
						window.setTitle("Blockloy - " + parts[parts.length - 1]);
					}
				},
				{
					label: "Save",
					accelerator: "CmdOrCtrl+S",
					click: async () => {
						window.webContents.send("get-save");
					}
				},
				{
					label: "Run",
					accelerator: "CmdOrCtrl+R",
					click: async () => {
						window.webContents.send("get-run");
					}
				}
			]
		},
		// { role: "editMenu" }
		{
			label: "Edit",
			submenu: [
				{ role: "undo" },
				{ role: "redo" },
				{ type: "separator" },
				{ role: "cut" },
				{ role: "copy" },
				{ role: "paste" },
			]
		},
		// { role: "windowMenu" }
		{
			label: "Window",
			submenu: [
				{ role: "minimize" },
				{ role: "togglefullscreen" },
				{ type: "separator" },
				{ role: "zoomIn" },
				{ role: "zoomOut" },
				{ role: "resetZoom" }
			]
		},
		{
			role: "help",
			submenu: [
				{role: "forceReload"},
				{role: "toggleDevTools"},
				{
					label: "View Github",
					click: async () => {
						const { shell } = require("electron");
						await shell.openExternal("https://github.com/elijahjcobb");
					}
				}
			]
		}
	];

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	await window.loadURL("http://localhost:3000");

	let integration: AlloyIntegration | undefined;

	ipcMain.handle("get-save", async (event, arg: string) => {
		fs.writeFileSync(file, arg);
	});

	ipcMain.handle("get-run", async (event, arg: string) => {
		fs.writeFileSync(file, arg);
		if (integration) integration.stop();
		integration = new AlloyIntegration(file, window);
	});

}

app.whenReady().then(createWindow);
