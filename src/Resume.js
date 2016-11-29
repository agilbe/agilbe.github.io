import React from 'react';

var Resume = React.createClass({
	render() {
		return(<div className="resume container">
			<div className="pageTitle">resume</div>
			<div>click on the resume to download a copy!</div>
			<div className="resumeEmbed">
				<a href="data/resume2.pdf" download="data/resume2.pdf" target="_blank"><img id="resumePDF" src="data/resume2pic.jpg" alt="resume" /></a>
			</div>
		</div>)
	}
});

export default Resume;