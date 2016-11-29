import React from 'react';
import { Link } from 'react-router';
import './gen.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var App = React.createClass({
	render() {
		return (
				<div className="App">
					<div className="navbar leftPage">
						<Link className="link pageName" activeClassName='active' to="/">home</Link>
						<Link className="link pageName" activeClassName='active' to="/projects">projects</Link>
						<Link className="link pageName" activeClassName='active' to="/resume">resume</Link>
						<Link className="link pageName" activeClassName='active' to="/contact">contact</Link>
					</div>
					{this.props.children}
				</div>
		);
	}
});

export default App;