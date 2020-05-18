/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as React from "react";
import "./index.css";
import {TopBar} from "./topBar/TopBar";
import {WelcomeView} from "./welcome/WelcomeView";
import "./App.css";

export interface AppProps {

}

export interface AppState {

}

export class App extends React.Component<AppProps, AppState> {

	public constructor(props: AppProps) {

		super(props);
		this.state = {};

	}

	public render(): React.ReactElement {

		return (<div className={"App"}>
			<TopBar/>
			<div className={"main"}>
				<WelcomeView/>
			</div>
		</div>);

	}
}