import { useState, useEffect } from "react";
import './App.css';

import Quiz from "./Quiz";
import Penguin from "./Penguin";
// import penguinQuiz from './penguinQuiz.json';
import { xAccessKey } from "./constants";

function App() {

  const [loaded, setLoaded] = useState(false);
  const [questions, setQuestions] = useState([]);

  // Static Json Loading Test
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoaded(true);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  // Dynamic Json Loading
  useEffect(() => {

    fetch("https://api.jsonbin.io/v3/b/65b845e8266cfc3fde82fe58", { headers: { 'X-Access-Key': xAccessKey } })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.record.questions);
        setLoaded(true);
        // console.log("Loaded Questions:", questions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  if (!loaded) {
    return <div className="load-container">
      <h1>Penguin Quiz</h1>
      <p>Loading...</p>
    </div>;
  }

  return (
    <>
      <Quiz questions={questions} />
      {/* <Quiz questions={penguinQuiz.questions} /> */}
      <Penguin />
    </>

  );
}

export default App;