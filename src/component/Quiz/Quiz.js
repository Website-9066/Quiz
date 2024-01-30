import React, { useEffect, useState } from 'react';
import { getdataApi } from '../../redux/services/AuthServices';

const Quiz = () => {
  const [postdata, setPostdata] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionResults, setQuestionResults] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = () => {
    getdataApi()
      .then(result => {
        if (result.data.response_code === 0) {
          setPostdata(result.data);
          shuffleOptions(result.data.results[0]);
        } else if (result.data.response_code === 5) {
          getAlbums();
        } else {
          // console.error('Unexpected response_code:', result.data.response_code);
        }
      })
      .catch(error => {
        // console.error('Error fetching questions:', error);
      });
  };

  const handleOptionChange = (event) => {
    const selectedAnswer = event.target.value;
    setUserAnswer(selectedAnswer);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentQuestion = postdata.results[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;
    setCorrectAnswer(correctAnswer);

    const isCorrect = userAnswer === correctAnswer;
    setQuestionResults(prevResults => [...prevResults, isCorrect]);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setUserAnswer(''); 
    setShowResult(false);
    setCorrectAnswer('');
    shuffleOptions(postdata.results[currentQuestionIndex + 1]);
  };

  const shuffleOptions = (currentQuestion) => {
    if (!currentQuestion) return;
    const { incorrect_answers, correct_answer } = currentQuestion;
    const allOptions = [...incorrect_answers, correct_answer];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffledOptions);
  };

  const data = postdata.response_code === 0 ? postdata.results : [];

  const currentQuestionData = data[currentQuestionIndex];

  if (!currentQuestionData) {
    return (
      <div>
        <h3>Total Questions: 10</h3>
        <h3>Total Correct : {questionResults.filter(result => result).length}</h3>
        <h3>Total Incorrect: {questionResults.filter(result => !result).length}</h3>
      </div>
    );
  }

  return (
    <div>
      {data.length > 0 && currentQuestionIndex < data.length ? (
        <div>
          <div className='Question'>
            Question {currentQuestionIndex + 1}: {data[currentQuestionIndex].question}
          </div>

          <form onSubmit={handleSubmit}>
            {shuffledOptions.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    name="peaceRank"
                    value={option}
                    checked={userAnswer === option}
                    onChange={handleOptionChange}
                    disabled={showResult}
                  />
                  {option}
                </label>
              </div>
            ))}
            <button type="submit" disabled={showResult}>
              Submit
            </button>
          </form>

          {showResult && (
            <div>
              <p>
                {userAnswer === correctAnswer ? 'Correct!' : 'Wrong! Correct answer:'} {correctAnswer}
              </p>
              <button type="button" onClick={handleNextQuestion}>
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>No questions available.</div>
      )}
    </div>
  );
};

export default Quiz;
