/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {BrowserWindow, app, ipcMain, Menu, MenuItemConstructorOptions, MenuItem} from "electron";
import {AlloyIntegration} from "./alloy/AlloyIntegration";

async function createWindow () {

	const dimensions = {
		width: 854,
		height: 480
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
				{role: "about"},
				{ type: "separator" },
				{role: "hide"},
				{role: "hideOthers"},
				{role: "unhide"},
				{ type: "separator" },
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
						const { shell } = require("electron");
						await shell.openExternal("https://github.com/elijahjcobb");
					}
				},
				{
					label: "Compile and Run",
					accelerator: "CmdOrCtrl+R",
					click: async () => {
						const { shell } = require("electron");
						await shell.openExternal("https://github.com/elijahjcobb");
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

	ipcMain.handle("open-alloy", async (event, arg: string) => {
		if (integration) integration.stop();
		integration = new AlloyIntegration(arg);
	});

}

app.whenReady().then(createWindow);
