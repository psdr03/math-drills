import React, { ReactEventHandler, useState } from 'react';
import {
  Grid,
  Box,
  Button,
  Card,
  TextField,
  Paper,
  InputAdornment,
} from '@mui/material'

const IndividualQuestion = (props: any) => {
  const { question } = props
  const { answer } = props
  const [error, setError] = useState(false)
  const [userAnswer, setUserAnswer] = useState(0);
  const [isCorrect, setIsCorrect]  = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(parseInt(event.target.value));
  }

  const handleSubmit = () => {
    if (userAnswer === answer) {
      setError(false)
      setIsCorrect(true)
    } else {
      setError(true)
    }
  }

  return (
    <Paper key={question} sx={{
      margin: '20px',
      flexGrow: '1',
      boxShadow: '0'
    }}>

    <TextField
      error={error}
      label={error ? 'Wrong answer' : null}
      disabled={isCorrect}
      autoComplete="off"
      InputProps={{
        startAdornment: <InputAdornment position="start">{question} = </InputAdornment>,
      }}
      onChange={handleOnChange}
      sx={{
        width: '250px'
      }}
    >
    </TextField>
    <Button
      sx={{
        height: '100%',
        width: '100px'
      }} 
      variant="contained" 
      onClick={handleSubmit}
      disabled={userAnswer === 0 ? true : false}
      color={!error ? 'success' : 'error'}
    >
      {isCorrect ? 'CHECK' : 'SUBMIT'}
    </Button>
  </Paper>
  )
}

export default IndividualQuestion;