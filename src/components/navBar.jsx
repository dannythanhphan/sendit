import React from 'react';
import '../assets/navBar.css'

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.openMenu = this.openMenu.bind(this);
    }

    openMenu() {
        console.log("hit")
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="nav-bar-title-icon">
                    <i className="question-icon far fa-question-circle"></i>
                    <p className="nav-bar-title">
                        Send It
                    </p> 
                </div>

                <div className="nav-bar-socials">
                    <a className="nav-social-container" href="https://github.com/dannythanhphan">
                        <i className="fab fa-github"></i>
                        <p className="social-text">Github</p>
                    </a>
                    <a className="nav-social-container" href="https://www.linkedin.com/in/danny-phan-0b6307184/">
                        <i className="fab fa-linkedin-in"></i>
                        <p className="social-text">LinkedIn</p>
                    </a>
                    <a className="nav-social-container" href="https://angel.co/u/danny-thanh-phan">
                        <i className="fab fa-angellist"></i>
                        <p className="social-text">AngelList</p>
                    </a>
                </div>
            </div>
        )
    }
}

export default NavBar;