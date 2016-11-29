import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App'
import Intro from './Intro'
import Projects from './Projects'
import About from './About'
import Resume from './Resume'

// Render DOM -- wrapper in MuiThemeProvider for material-ui elements
ReactDOM.render(
    <MuiThemeProvider>
        <Router history={hashHistory}>
        	<Route path="/" component={App}>
        		<IndexRoute component={Intro}/>
        		<Route path="projects" component={() => (<Projects projects="projectList" />)}/>
        		<Route path="resume" component={Resume}/>
        		<Route path="contact" component={About}/>
        	</Route>
        </Router>
    </MuiThemeProvider>,
  document.getElementById('root')
);
