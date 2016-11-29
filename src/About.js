import React from 'react';
import $ from 'jquery';

var About = React.createClass({
	mailenter:function(event) {
		// $('#emailAdd').stop().fadeIn('slow');
		// $('#phoneNum').stop().fadeOut('slow');
		$('#emailAdd').stop().fadeTo(500, 1);
		$('#phoneNum').stop().fadeTo(500, 0);
	},

	phoneenter:function(event) {
		// $('#phoneNum').stop().fadeIn('slow');
		// $('#emailAdd').stop().fadeOut('slow');
		$('#phoneNum').stop().fadeTo(500, 1);
		$('#emailAdd').stop().fadeTo(500, 0);
	},

	render() {
		return(
			<div className="about container">
				<div className="pageTitle">contact</div>
				<div>talk to me!</div>
				<div className="centerPic" ><img className="icon" onMouseOver={event => this.phoneenter(event)} id="phone" src='data/phone.png' alt='phone' />
				<img className="icon" onMouseOver={event => this.mailenter(event)} id="email" src='data/mail.png' alt='email' />
				</div>
				<div className="centerPic" ><span className="contactInfo" id="phoneNum">408-643-4577</span><span className="contactInfo" id="emailAdd">agilbe@uw.edu</span></div>
			</div>
		)
	}
});

export default About;