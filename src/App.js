import { useState, useEffect } from "react";
import './App.css';

import Quiz from "./Quiz";
import Penguin from "./Penguin";
// import { penguinQuiz } from './constants';
import quizData from './penguinQuiz.json';

function App() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate asynchronous loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return <div className="load-container">
      <h1>Penguin Quiz</h1>
      <p>Loading...</p>
      </div>;
  }

  return (
    <>
      <Quiz questions={quizData.questions} />
      {/* <Quiz questions={penguinQuiz.questions} /> */}
      <Penguin />
    </>

  );
}

export default App;