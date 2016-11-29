import React from 'react';
import ProjectItem from './ProjectItem'

var Projects = React.createClass({
	getInitialState() {
		return {projectList:[]};
	},
	componentDidMount(){
		var blank = [];
		fetch('data/projects.json')
            .then(response => response.json())
            .then(data => blank = data['projects'])
            .then(data => this.setState({projectList:blank}))
			//.then(data => console.log("this is my array:", blank))
		    
	},
	render() {
		//console.log("this is the state array:", this.state.projectList)
		if (this.state.projectList === undefined) {
			return(
				<div>
					my projects
				</div>
			)
		} else {
			return(
				<div className="projects container">
					<div className="pageTitle">projects</div>
					<div className="projectList">
						{this.state.projectList.map(function(project, i){
						return (<ProjectItem key={'project-' + i}
							title={project.title}
							link={project.link}
							desc={project.desc}
						/>)
					})}
					</div>
				</div>
			)
		}
	}
});

export default Projects;