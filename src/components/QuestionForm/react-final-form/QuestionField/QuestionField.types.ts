import { ReactElement } from "react";
import { Question } from "../QuestionForm.types";

export interface QuestionFieldProps {
  question: Question;
  questions: Question[];
  renderQuestion: (children: ReactElement) => ReactElement;
}
