import { FC } from "react";
import { Text } from "@chakra-ui/react";

import { QuestionFormUtilities } from "../QuestionForm/rc-field-form/QuestionForm.utilities";

import { BackOfficeQuestionResultsProps } from "./BackOfficeQuestionResults.types";
import {
  Question,
  SupportedFormField,
} from "../QuestionForm/rc-field-form/QuestionForm.types";

export const BackOfficeQuestionResults: FC<BackOfficeQuestionResultsProps> = ({
  answers = {},
  schema,
}) => {
  const getAnswerForQuestion = (
    question: Question,
    answers: BackOfficeQuestionResultsProps["answers"] = {}
  ) => {
    switch (question.field.type) {
      case SupportedFormField.RadioGroup: {
        const option =
          QuestionFormUtilities.getRadioGroupOptionForQuestionByValue(
            question,
            answers[question.field.properties.name] ?? ""
          );

        return option?.label;
      }
      default: {
        return answers[question.field.properties.name];
      }
    }
  };
  return (
    <>
      {Object.keys(answers).map((name) => {
        const question = QuestionFormUtilities.getQuestionByName(
          schema.questions,
          name
        );
        if (!question) {
          return null;
        }
        return (
          <Text>
            <Text fontWeight="bold" display="inline">
              [{question?.field.properties.name}]: {question?.field.prompt}
            </Text>
            <Text display="inline" marginLeft={4}>
              {getAnswerForQuestion(question, answers)}
            </Text>
          </Text>
        );
      })}
    </>
  );
};
