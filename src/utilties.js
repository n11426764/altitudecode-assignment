export const checkUserAnswers = (userChoices, questions) => {
    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
  
    for (let i = 0; i < questions.length; i++) {
      const userChoice = userChoices[i];
      const correctAnswer = questions[i].correctAnswer;
  
      if (userChoice && userChoice.answer === correctAnswer) {
        score += 5;
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    }
  
    return {
      score,
      correctAnswers,
      wrongAnswers,
    };
  };
  