import React, { useState } from 'react';
import './App.css';
import QuestionCard from './QuestionCard';

type Question={
  category:string;
  type:string;
  difficulty:string;
  question:string;
  correct_answer:string;
  incorrect_answers:string[];
}

function App() {
  function shuffle(ans:string[])
  {
    return ans.sort();
  }

  function showNext()
  {
    setCurrentQuestion(currentQuestion+1);
    setSelectedAns("");
  }

  const [start, setStart] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedAns, setSelectedAns] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('easy');
  const [isContinued, setIsContinued] = useState(false);
  function startQuiz()
  {
    (async function()
    {
      if(totalQuestions <= 0)
        { 
          alert("Please enter valid amount of Questions!");
          return;
        }
        setisLoading(true);
        setStart(false);
        const {results} = await (await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)).json();
        setQuestions(results);
        setisLoading(false);
        setStart(true);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAns("");
        setTotalQuestions(10);
    })();
  }
  function restartQuiz()
  {
    setScore(0);
    setIsContinued(false);
  }
  function doContinue()
  {
    setStart(false);
    setIsContinued(true);
    setSelectedAns("");
    setCurrentQuestion(0);
  }
  function setcategory(e:React.ChangeEvent<HTMLSelectElement>)
  {
    setCategory(e.target.value);
  }
  function setdifficulty(e:React.ChangeEvent<HTMLSelectElement>)
  {
    setDifficulty(e.target.value);
  }

  return (
    <div className='app'>
      <div className='topTitle'>Quizzer</div>
      {start?<div className='score'>Score: {score}</div>:null}
      {!start && !isContinued?<div className='optionsBox'>
        <div>
          <div>Difficulty:</div>
          <select className='formElement' defaultValue={difficulty} onChange={setdifficulty}>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
          <div>Category:</div>
          <select className='formElement' defaultValue={category} onChange={setcategory}>
            <option value="9">General Knowledge</option>
            <option value="11">Entertainment: Film</option>
            <option value="18">Science: Computers</option>
            <option value="21">Sports</option>
            <option value="23">History</option>
          </select>
          </div>
        </div>:null}
      
      {!start && !isContinued && !currentQuestion?<button className='btn' onClick={startQuiz}>Start Quiz</button>:null}
      {isLoading?<p style={{color:'white'}}>Loading...</p>:null}
      {start?
      <div className='questionCard'>
        <div><b>Question : {currentQuestion+1}/{totalQuestions}</b></div>
      <QuestionCard question = {questions[currentQuestion].question} selectedAns={selectedAns} callback={setSelectedAns} answers=
      {shuffle([...questions[currentQuestion].incorrect_answers,questions[currentQuestion].correct_answer])}
      correctAns={questions[currentQuestion].correct_answer} setScore={setScore} score={score}/></div>:null
      }
      {selectedAns && currentQuestion !== totalQuestions-1?
      <button onClick={showNext} className='btn'>Next</button>:null
      }
      {!isContinued && selectedAns && currentQuestion === totalQuestions-1?
        <button onClick={doContinue} className='btn'>Continue</button>:null}
        {isContinued?<div>
          <div className='scoreCard'>
          <h2>Quiz Over!</h2>
          <h3>Your Score: {score}</h3>
          </div>
          <button onClick={restartQuiz} className='btn'>Restart Quiz</button>
        </div>:null}
    </div>
  );
}

export default App;
