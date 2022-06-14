import { FC } from "react";
import { SubmitButton } from "../../../../fields/SubmitButton";
import { Question, SubmitButtonProperties } from "../../QuestionForm.types";

export const SubmitButtonWrapper: FC<{
  question: Question<SubmitButtonProperties>;
}> = ({ question }) => <SubmitButton {...question.properties} />;
