import React, { useState } from 'react';
import './App.css';
import { fetchQuizQuestions, QuestionState } from './API'
import QuestionCard from './components/QuestionCard';
import {GlobalStyle, Wrapper} from './App.styles'
import Dialog from './components/Dialog'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [showDialog, setShowDialog] = useState(true)
  const [TOTAL_QUESTIONS, setTOTAL_QUESTIONS] = useState(5)
  const [difficulty, setDifficulty] = useState('easy')

  // console.log('Data in App->',fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY))
  // console.log('Data in App->->', questions)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty)
    setQuestions(newQuestions)
    // console.log('Data in StartTrivia->',questions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value //gets the value from the user selection
      const correct = questions[number].correct_answer === answer //compares and then assigns the correct answer
      //increament in Score
      if (correct) setScore(prev => prev + 1)

      // Save answer in userAnswers array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (number === TOTAL_QUESTIONS) {
      setShowDialog(true)  
     } else {
      setNumber(nextQuestion)
    }
  }
  
  const handleExit = () => {
      setGameOver(true)
      setShowDialog(true)  
  }

  const handleClick = (data: {noOfQs: number, difficulty:string}) => {
    setTOTAL_QUESTIONS(data.noOfQs)
    setDifficulty(data.difficulty)
    setShowDialog(false)
  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>QUIZ APP</h1>
      
      <Dialog show = {showDialog} handleClick={handleClick} />
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
        <button className="start" onClick={startTrivia}>Start</button>
        : null
      }

      {!gameOver && <p className='score'>Score: {score}</p>}

      {loading && <p>Loading...</p>}

      {!loading && !gameOver ?
        <QuestionCard
          question={questions[number].question}
          questionNr={number + 1}
          answers={questions[number].answers}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          totalQuestions={TOTAL_QUESTIONS}
        /> : null}

      {!gameOver && !loading &&
        userAnswers.length === number + 1
        ? 
        number !== TOTAL_QUESTIONS - 1 ?
          <button className="next" onClick={nextQuestion}>Next Question</button> : <button className="next" onClick={handleExit}>Exit</button> :
        null
      }

    </Wrapper>
    </>
  );
}

export default App;
