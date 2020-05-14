/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {BrowserWindow, app} from "electron";

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

}

app.whenReady().then(createWindow);