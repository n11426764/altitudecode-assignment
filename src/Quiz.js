import { useState, useEffect } from "react";
import './Quiz.css';
import { resultInitialState, gameTimer } from "./constants";
import { checkUserAnswers } from "./utilties";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userChoices, setUserChoices] = useState(Array(questions.length).fill(null));
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);
    const { question, choices } = questions[currentQuestion];
    const [timeLeft, setTimeLeft] = useState(gameTimer);

    const onAnswerClick = (answer, index) => {
        setUserChoices((prevUserChoices) => {
            const updatedUserChoices = [...prevUserChoices];
            updatedUserChoices[currentQuestion] = { answer, index };
            // console.log("Updated User Choices:", updatedUserChoices);
            return updatedUserChoices;
        });
    };

    const onClickPrev = () => {
        setCurrentQuestion((prev) => prev - 1);
    };

    const onClickNext = () => {
        const updatedResult = checkUserAnswers(userChoices, questions);
        setResult(updatedResult);

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
        }
    };

    const onClickPlay = () => {
        setUserChoices(Array(questions.length).fill(null));
        setResult(resultInitialState);
        setTimeLeft(gameTimer);
        setShowResult(false);
    };

    useEffect(() => {
        if (timeLeft === 0) {
            const updatedResult = checkUserAnswers(userChoices, questions);
            setResult(updatedResult);
            setShowResult(true);
        } else {
            const timer = setTimeout(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    return (
        <div className="quiz-container">
            <h1>Penguin Quiz</h1>
            {!showResult ? (
                <>
                    <div className="question">
                        <div className="question-timer"><span>Time Limit:</span> {timeLeft} seconds</div>
                        <div className="question-progress"><span>Question:</span> {currentQuestion + 1} / {questions.length}</div>
                        <h2 className="question-title">{question}</h2>

                        <ul className="question-choices">
                            {choices.map((answer, index) => (
                                <li
                                    onClick={() => onAnswerClick(answer, index)}
                                    key={answer}
                                    className={userChoices[currentQuestion]?.index === index ? "selected-answer" : null}
                                >
                                    {answer}
                                </li>
                            ))}
                        </ul>
                        <div className="footer">
                            {currentQuestion !== 0 && (
                                <button
                                    className="button button-previous"
                                    onClick={onClickPrev}
                                    disabled={currentQuestion === 0}
                                >
                                    Prev
                                </button>)}

                            <button
                                className="button button-next"
                                onClick={onClickNext}
                                disabled={!userChoices[currentQuestion]}
                            >
                                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                // ... (result display code)
                <div className="result">
                    <h2 className="result-title">Result</h2>
                    <hr />
                    <p>Total Questions: <span>{questions.length}</span></p>
                    <p>Total Score: <span>{result.score}</span></p>
                    <p>Correct Answers: <span>{result.correctAnswers}</span></p>
                    <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>
                    <div className="footer">
                        <button className="button button-play-more" onClick={onClickPlay}>
                            Play More
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
