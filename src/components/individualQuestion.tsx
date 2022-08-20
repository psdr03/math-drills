import React, { useState } from 'react';
import {
  Button,
  TextField,
  Paper,
  InputAdornment,
} from '@mui/material'

const IndividualQuestion = (props: any) => {
  const { question } = props
  const { answer } = props
  const [error, setError] = useState(false)
  const [userAnswer, setUserAnswer] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

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
      display: 'flex',
      margin: '20px',
      boxShadow: '0',
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
          maxWidth: '250px'
        }}
      >
      </TextField>
      <Button
        sx={{
          height: '100%',
          width: '120px'
        }}
        variant="contained"
        onClick={handleSubmit}
        disabled={userAnswer === 0 ? true : false}
        color={!error ? 'success' : 'error'}
      >
        {isCorrect ? 'CORRECT' : 'SUBMIT'}
      </Button>
    </Paper>
  )
}

export default IndividualQuestion;