import React from 'react';

var Intro = React.createClass({
	render() {
		return(<div className="intro container">
			<div className="pageTitle">alex gilbert</div>
			<div>dev, design, and everything in between</div>
			<div className="aboutMe"><img className="me" src='data/me2.png' alt='my beautiful face' /></div>
			<div className="bio">
				Hi! My name is <span className="emphasis">Alex Gilbert</span>, and <br />
				I'm attending the <span className="emphasis">University of Washington</span>. <br />
				I'm a <span className="emphasis">designer</span> and an <span className="emphasis">engineer</span>.
				<br /><br /><br />
				Let's build something cool together.
			</div>
		</div>)
	}
});

export default Intro;