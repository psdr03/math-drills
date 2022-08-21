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

export interface IOperationSolo {
  symbol: string,
  fn: Function
}

export interface IOperationsObjectSource {
  [key: string]: IOperationSolo
}
