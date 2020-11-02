import React from 'react';
import '../assets/langingPage.css'
import landing from '../assets/17252.jpg'

class LandingPage extends React.Component {

    render() {
        window.scrollTo(0,document.body.scrollHeight)
        return (
            <div className="landing-page-main">
                <img src={landing} alt="activities" className="landing-img"/>

                <div className="landing-introduction">
                    <p className="landing-introduction-title">
                        A quick and fun way to test your Trivia skills!
                    </p>
                    <p className="landing-introduction-body">
                        Think you know it all? Test your general knowledge in a game of Trivia - Send It! Click the button below to begin. 
                    </p>
                    <a className="landing-start-button" href="#main">
                        Quiz Me!
                    </a>
                </div>
            </div>
        );
    }
}

export default LandingPage;