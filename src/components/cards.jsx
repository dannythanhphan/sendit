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
            animation: false,
            choices: [],
            questions: [],
            playThrough: 0
        }
    }

    handleAnswer = (e, choice) => {
        e.preventDefault();
        this.setState({ usersAnswer: choice, disabled: false })
    }

    submitAnswer = (e) => {
        e.preventDefault();
        const { usersAnswer, currentAnswer, currentIndex, score } = this.state
        if (usersAnswer !== currentAnswer) {
            document.getElementsByClassName(`${usersAnswer}`)[0].childNodes[1].style.display = "block";
            document.getElementsByClassName(`${currentAnswer}`)[0].childNodes[0].style.display = "block";
            let buttons = document.getElementsByTagName("button")
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
        } else {
            document.getElementsByClassName(`${currentAnswer}`)[0].childNodes[0].style.display = "block";
            let buttons = document.getElementsByTagName("button")
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
        }

        setTimeout(() => {
            if (usersAnswer === currentAnswer) {
                this.setState({ currentIndex: currentIndex + 1, 
                    score: score + 1})
            } else {
                this.setState({ currentIndex: currentIndex + 1})
            }

        }, 2000)
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
        let choices = incorrect.slice();
        choices.push(correct);
        choices = this.generatePositionOfAnswers(choices);
        this.setState({ generateAnswers: false, currentAnswer: correct })
        return choices
    }

    
    hideSubmit = () => {
        document.getElementsByClassName("cards-submit-button")[0].style.display = "none"
    }
    
    generateNewQuestions = () => { 
        let arrayOfIndices = [];
        
        while (arrayOfIndices.length < 10 ) {
            let randomNumber = Math.floor(Math.random() * 21)
            if (!arrayOfIndices.includes(randomNumber)) arrayOfIndices.push(randomNumber);
        };
        
        return arrayOfIndices
    }
    
    componentDidMount() {
        const { currentIndex } = this.state;
        const { questionOrder } = this.props;

        let currentChoices = this.generateChoices(TriviaData[questionOrder[currentIndex]].incorrect, 
            TriviaData[questionOrder[currentIndex]].correct)
        this.setState({ choices: currentChoices })
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentIndex, questions, playThrough } = this.state;
        const { questionOrder } = this.props;

        let questionsCheck = playThrough === 0 ? questionOrder.slice() : questions.slice();

        if (this.state.currentIndex > prevState.currentIndex && currentIndex < 10) {
            let currentChoices = this.generateChoices(TriviaData[questionsCheck[currentIndex]].incorrect, 
                TriviaData[questionsCheck[currentIndex]].correct)
            this.setState({ choices: currentChoices, disabled: true })
        } else if (currentIndex === 0 && prevState.currentIndex > 0) {
            let incrementPlaythrough = playThrough + 1;
            let currentChoices = this.generateChoices(TriviaData[questions[currentIndex]].incorrect, 
                TriviaData[questions[currentIndex]].correct)
            this.setState({ choices: currentChoices, disabled: true, playThrough: incrementPlaythrough })
        }
    }

    playAgain = (e) => {
        e.preventDefault();
        let newQuestions = this.generateNewQuestions();
        document.getElementsByClassName("cards-submit-button")[0].style.display = "block"
        this.setState({
            usersAnswer: "",
            currentAnswer: "",
            score: 0,
            currentIndex: 0,
            generateAnswers: true,
            disabled: true,
            animation: false,
            choices: [],
            questions: newQuestions
        })
    }

    render() {
        const { currentIndex, score, usersAnswer, choices, disabled, questions, playThrough } = this.state;
        let questionOrder = playThrough === 0 ? this.props.questionOrder.slice() : questions.slice()
        let displayChoices;

        if (choices.length > 1) {
            displayChoices = choices.map(choice => 
                <button 
                    key={`${Math.random()}`} 
                    className={`cards-choice ${choice} ${usersAnswer === choice ? "selected" : ""}`}
                    onClick={(e) => this.handleAnswer(e, choice)} 
                >
                    <i className="correct-answer fas fa-check"></i>
                    <i className="incorrect-answer fas fa-times"></i>
                    {choice}
                </button>
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

                <button 
                    onClick={(e) => this.playAgain(e)}
                    className="cards-play-again-button"
                >
                    Play Again
                </button>
            </div>
        )

        if (currentIndex === 10) {
            this.hideSubmit();
        }

        return (
            <div className="cards-container">
                <div className="score-count-container">
                    <div className="display-score">
                        Score: {score}
                    </div>
                    <div className="display-num-of-questions">
                        {currentIndex < 10 ? currentIndex : 10} / 10
                    </div>
                </div>

                {displayGameOrScore}

                <div className="cards-score-questions-container">
                    <button onClick={(e) => this.submitAnswer(e)} 
                    className="cards-submit-button"
                    disabled={disabled}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default Cards;