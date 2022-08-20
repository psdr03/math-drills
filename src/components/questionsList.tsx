import React from 'react';
import {
  Grid,
  Box,
  Card,
  TextField,
  Paper,
  InputAdornment,
} from '@mui/material'
import IndividualQuestion from './individualQuestion'

interface QuestionObject {
  question: string,
  answer: number
}

const Questions = (props: any) => {
  const { questionsArray } = props;

  return (
    <Grid
      container
      justifyContent="center"
    >
      <Box
        sx={{
          width: '60%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {questionsArray.map((item: QuestionObject) => {
          return (
            <IndividualQuestion question={item.question} answer={item.answer}></IndividualQuestion>
          )
        })}
      </Box>
    </Grid>
  )
}

export default Questions;