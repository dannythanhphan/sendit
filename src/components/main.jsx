import React from 'react';
import '../assets/main.css';
import Cards from './cards';

class Main extends React.Component {
    generateQuestions() { 
        let arrayOfIndices = [];

        while (arrayOfIndices.length < 10 ) {
            let randomNumber = Math.floor(Math.random() * 21)
            if (!arrayOfIndices.includes(randomNumber)) arrayOfIndices.push(randomNumber);
        };

        return arrayOfIndices
    }

    render() {
        const questionOrder = this.generateQuestions();
        return (
            <div className="main-body" id="main">
                <Cards 
                    questionOrder={questionOrder}
                    // generateQuestions={this.generateQuestions}
                />
            </div>
        );
    }
}

export default Main;