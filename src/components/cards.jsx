import React from 'react';
import '../assets/cards.css'
import TriviaData from '../data/Apprentice_TandemFor400_Data.json';

class Cards extends React.Component {
        
    constructor(props) {
        super(props)
        this.state = {
            usersAnswer: "",
            currentAnswer: "",
            score: 0,
            currentIndex: 0,
            generateAnswers: true,
            disabled: true,
            choices: []
        }
    }

    handleAnswer = (e, choice) => {
        e.preventDefault();
        this.setState({ usersAnswer: choice, disabled: false })
    }

    submitAnswer = (e) => {
        e.preventDefault();
        const { usersAnswer, currentAnswer, currentIndex, score } = this.state
        if (usersAnswer === currentAnswer) {
            this.setState({ currentIndex: currentIndex + 1, 
                score: score + 1})
        } else {
            this.setState({ currentIndex: currentIndex + 1})
        }
        // document.getElementsByClassName("cards-submit-button")[0].disabled = true
    }

    generatePositionOfAnswers = (choices) => {
        let arrayOfIndices = [];
        let result = [];

        while (arrayOfIndices.length < choices.length ) {
            let randomNumber = Math.floor(Math.random() * choices.length)
            if (!arrayOfIndices.includes(randomNumber)) arrayOfIndices.push(randomNumber);
        };

        for (let i = 0; i < choices.length; i++) {
            result.push(choices[arrayOfIndices[i]]);
        }

        return result
    }

    generateChoices = (incorrect, correct) => {
        let choices = incorrect
        choices.push(correct);
        choices = this.generatePositionOfAnswers(choices);
        this.setState({ generateAnswers: false, currentAnswer: correct })
        return choices
    }

    componentDidMount() {
        const { currentIndex } = this.state;
        const { questionOrder } = this.props;
        let currentChoices = this.generateChoices(TriviaData[questionOrder[currentIndex]].incorrect, 
            TriviaData[questionOrder[currentIndex]].correct)
        this.setState({ choices: currentChoices })
    }

    hideSubmit = () => {
        document.getElementsByClassName("cards-submit-button")[0].style.display = "none"
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentIndex } = this.state;
        const { questionOrder } = this.props;
        // document.getElementsByClassName("cards-submit-button")[0].disabled = true
        if (this.state.currentIndex > prevState.currentIndex && currentIndex < 10) {
            let currentChoices = this.generateChoices(TriviaData[questionOrder[currentIndex]].incorrect, 
                TriviaData[questionOrder[currentIndex]].correct)
            this.setState({ choices: currentChoices, disabled: true })
        }
    }

    // playAgain = () => {
    //     
    // }

    render() {
        const { currentIndex, score, usersAnswer, choices, disabled } = this.state;
        const { questionOrder } = this.props;
        let displayChoices;

        if (choices.length > 1) {
            displayChoices = choices.map(choice => 
                <p 
                    key={`${Math.random()}`} 
                    className={`cards-choice ${choice} ${usersAnswer === choice ? "selected" : ""}`}
                    onClick={(e) => this.handleAnswer(e, choice)} 
                >
                    {choice}
                </p>
            )
        }

        let displayGameOrScore = currentIndex < 10 ? (
            <div className="question-container">
                <div className="cards-question">
                    {TriviaData[questionOrder[currentIndex]].question}
                </div>
                <div className="cards-question-container">
                    {displayChoices}
                </div>
            </div>
        ) : (
            <div className="cards-game-over-container">
                <p>
                    You got {score} / 10 correct!
                </p>

                {/* <button 
                    onClick={() => this.playAgain}
                    className="cards-play-again-button"
                >
                    Play Again
                </button> */}
            </div>
        )

        if (currentIndex === 10) {
            this.hideSubmit();
        }

        return (
            <div className="cards-container">

                {displayGameOrScore}
                {/* <div className="question-container">
                    <div className="cards-question">
                        {TriviaData[questionOrder[currentIndex]].question}
                    </div>
                    <div className="cards-question-container">
                        {displayChoices}
                    </div>
                </div>

                <div className="cards-game-over-container">
                    <p>
                        you got {score} / 10 correct!
                    </p>
                </div> */}

                <div className="cards-score-questions-container">
                    <button onClick={(e) => this.submitAnswer(e)} 
                    className="cards-submit-button"
                    disabled={disabled}
                    >
                        Submit
                    </button>
                    <div className="display-score">
                        Score: {score}
                    </div>
                    <div className="display-num-of-questions">
                        {currentIndex < 10 ? currentIndex : 10} / 10
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;