/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {BrowserWindow, app, ipcMain} from "electron";
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
		webPreferences: {nodeIntegration: true},
		titleBarStyle: "customButtonsOnHover",
		frame: false,
		transparent: true,
	});

	window.setMenu(null);

	await window.loadURL("http://localhost:3000");

	ipcMain.handle("open-alloy", async (event, arg: string) => {
		AlloyIntegration.open(arg);
	});

}

app.whenReady().then(createWindow);
