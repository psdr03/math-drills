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
import { IOperationsObjectSource, IQuestionObject } from './interfaces/interfaces';
import { DIVISION_NUMS, SYMBOLS, OPERATIONS } from './constants/constants';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = () => {
  document.title = "Cesca's Math Drills"
  const [maxNum, setMaxNum] = useState<number>(0);
  const [questionsNum, setQuestionsNum] = useState<number>(0);
  const [questionsList, setQuestionsList] = useState<IQuestionObject[]>([]);
  const [userOperation, setUserOperation] = useState<string>('none')

  const maxNumHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxNum(parseInt(event.target.value));
  }

  const questionsHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionsNum(parseInt(event.target.value));
  }

  const generateNum = (max: number) => {
    return Math.floor(Math.random() * (max - 1 + 1) + 1)
  }

  const operationsSource: IOperationsObjectSource = {
    addition: {
      symbol: SYMBOLS.ADDITION,
      fn: (x: number, y: number) => { return x + y }
    },
    multiplication: {
      symbol: SYMBOLS.MULTIPLICATION,
      fn: (x: number, y: number) => { return x * y }
    },
    subtraction: {
      symbol: SYMBOLS.SUBTRACTION,
      fn: (x: number, y: number) => { return x - y }
    },
    division: {
      symbol: SYMBOLS.DIVISION,
      fn: (x: number, y: number) => { return x / y }
    }
  }

  const handleOperationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserOperation(event.target.value)
  }

  const handleReset = () => {
    setQuestionsList([]);
  }

  const generateQuestions = () => {
    for (let x = 0; x < questionsNum; x++) {
      let first = generateNum(maxNum);
      let second = generateNum(maxNum)

      // For subtraction operations, we make sure that the larger number is in the first position so that the difference is always positive. Can remove if negative is ok.
      if (userOperation === OPERATIONS.SUBTRACTION) {
        let tempArray = [first, second];
        tempArray.sort((a, b) => a - b)
        first = tempArray[1];
        second = tempArray[0]
      }

      // For division whole numbers only, no remainder
      if (userOperation === OPERATIONS.DIVISION) {
        first = second * generateNum(DIVISION_NUMS.MAX_MULTIPLIER)
      }

      // Formulate the question and answer and save to state
      const currentQuestion = `${first} ${operationsSource[userOperation].symbol} ${second}`;
      const obj = {
        question: currentQuestion,
        answer: operationsSource[userOperation].fn(first, second),
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
          <h1>Cesca's Math Drills</h1>
          <TextField
            id="outlined-basic"
            label="Maximum number"
            variant="outlined"
            onChange={maxNumHandleChange}
            autoComplete="off"
            inputProps={{
              type: "number"
            }}
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
            inputProps={{
              type: "number"
            }}
            sx={{
              margin: '20px',
              width: '250px'
            }}
          />
          <TextField
            label="Operation"
            select
            onChange={handleOperationChange}
            type="number"
            sx={{
              margin: '20px',
              width: '250px',
              textAlign: 'left'
            }}
          >
            {Object.keys(operationsSource).map((option: string) => (
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
        <Button size="large" onClick={generateQuestions} sx={{ margin: '10px' }} variant="contained">Create drills</Button>
      </Box>
      <Divider sx={{ marginTop: '20px' }} />
      {questionsList.length === 0 ? null : <Questions questionsArray={questionsList}></Questions>}

      <Box
        sx={{
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {questionsList.length === 0 ? null : <Button size="large" sx={{ marginTop: '50px' }} variant="contained" onClick={handleReset}>Reset</Button>}
      </Box>

    </ThemeProvider>
  );
}

export default App;
