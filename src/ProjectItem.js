import React from 'react';

//TODO: add in support for optional project/props media and media-link (additional picture/video)
var ProjectItem = React.createClass({
	render() {
		return(
			<div className="projectItem container">
				<h3 className="projectTitle"><a href={this.props.link}>{this.props.title}</a></h3><br/>
				{this.props.desc}<br/>
			</div>
		)
	}
});

export default ProjectItem