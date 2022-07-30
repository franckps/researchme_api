export type SurveyResultParams = {
  surveyId: string;
  accountId: string;
  answer: string;
  date: Date;
};

export type SurveyResultModel = {
  surveyId: string;
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
};

type SurveyAnswerModel = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
};
