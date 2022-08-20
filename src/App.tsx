import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
  TextField,
  Grid,
  Box,
  Button,
  Divider,
  MenuItem
} from '@mui/material'
import Questions from './components/questionsList';

interface QuestionObject {
  question: string,
  answer: number
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = () => {
  const [maxNum, setMaxNum] = useState<number>(0);
  const [questionsNum, setQuestionsNum] = useState<number>(0);
  const [questionsList, setQuestionsList] = useState<QuestionObject[]>([]);
  const [operation, setOperation] = useState<string>('none')

  const maxNumHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxNum(parseInt(event.target.value));
  }

  const questionsHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionsNum(parseInt(event.target.value));
  }

  const generateNum = (max: number) => {
    return Math.floor(Math.random() * (max - 1 + 1) + 1)
  }

  const operationsList = [
    'addition',
    'multiplication'
  ]

  const operationsSymbol: any = {
    addition: '+',
    multiplication: 'x'
  }

  const handleOperationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperation(event.target.value)
  }

  const operationFunctions: any = {
    'addition': (x: number, y: number) => { return x + y },
    'multiplication': (x: number, y: number) => { return x * y }
  }

  const generateQuestions = () => {
    for (let x = 0; x < questionsNum; x++) {
      const first = generateNum(maxNum);
      const second = generateNum(maxNum)
      const currentQuestion = `${first} ${operationsSymbol[operation]} ${second}`;
      const obj = {
        question: currentQuestion,
        answer: operationFunctions[operation](first, second),
      }
      setQuestionsList(questionsList => [...questionsList, obj])
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container justifyContent="center"
        sx={{
          display: 'flex',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h1>Cesca's Math drills</h1>
          <h2>CescaMakulit</h2>
          <TextField
            id="outlined-basic"
            label="Maximum number"
            variant="outlined"
            onChange={maxNumHandleChange}
            autoComplete="off"
            sx={{
              margin: '20px',
              width: '250px'
            }}
          />
          <TextField
            id="outlined-basic"
            label="Number of questions"
            variant="outlined"
            onChange={questionsHandleChange}
            autoComplete="off"
            sx={{
              margin: '20px',
              width: '250px'
            }}
          />
          <TextField
            label="Operation"
            select
            onChange={handleOperationChange}
            sx={{
              margin: '20px',
              width: '250px'
            }}
          >
            {operationsList.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Button onClick={generateQuestions} sx={{ margin: '10px' }} variant="contained">Create drills</Button>
      </Box>
      <Divider sx={{ marginTop: '20px' }} />
      {questionsList.length === 0 ? null : <Questions questionsArray={questionsList}></Questions>}
    </ThemeProvider>
  );
}

export default App;
