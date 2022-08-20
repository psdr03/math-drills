import React from 'react';
import {
  Grid,
  Box
} from '@mui/material'
import IndividualQuestion from './individualQuestion'
import { IQuestionObject, IQuestionsProps } from '../interfaces/interfaces'

const Questions = (props: IQuestionsProps) => {
  const { questionsArray } = props;

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        marginTop: '20px'
      }}
    >
      <Box
        sx={{
          width: '60%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {questionsArray.map((item: IQuestionObject) => {
          return (
            <IndividualQuestion question={item.question} answer={item.answer}></IndividualQuestion>
          )
        })}
      </Box>
    </Grid>
  )
}

export default Questions;