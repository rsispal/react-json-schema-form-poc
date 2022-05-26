import { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

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
      case SupportedFormField.LinkButton: {
        return Boolean(answers[question.field.properties.name])
          ? "Link clicked"
          : "Link not clicked";
      }
      default: {
        return answers[question.field.properties.name];
      }
    }
  };

  const renderQuestionAndAnswer = (
    question: Question,
    answer: string | boolean | undefined
  ) => {
    switch (question.field.type) {
      default: {
        return (
          <Box key={question.id}>
            <Text fontWeight="bold" display="inline">
              [{question?.field.properties.name}]: {question?.field.prompt}
            </Text>
            <Text display="inline" marginLeft={4}>
              {getAnswerForQuestion(question, answers)}
            </Text>
          </Box>
        );
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
        return renderQuestionAndAnswer(question, answers[name]);
      })}
    </>
  );
};
