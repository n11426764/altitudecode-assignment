import { useState, useEffect } from "react";
import './App.css';

import Quiz from "./Quiz";
import Penguin from "./Penguin";

import { penguinQuiz } from './constants';

function App() {

  return (
    <>
      <Quiz questions={penguinQuiz.questions} />
      <Penguin />
    </>

  );
}

export default App;