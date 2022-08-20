export interface IQuestionObject {
  question: string,
  answer: number
}

export interface IOperationsSymbol {
  [key: string]: string
}

export interface IQuestionsProps {
  questionsArray: IQuestionObject[]
}
