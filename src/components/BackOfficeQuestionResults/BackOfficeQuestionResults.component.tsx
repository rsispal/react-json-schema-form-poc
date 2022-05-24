import { FC } from "react";
import { Text } from "@chakra-ui/react";

import { QuestionFormUtilities } from "../QuestionForm/rc-field-form/QuestionForm.utilities";

import { BackOfficeQuestionResultsProps } from "./BackOfficeQuestionResults.types";

export const BackOfficeQuestionResults: FC<BackOfficeQuestionResultsProps> = ({
  answers = {},
  schema,
}) => {
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
        const option =
          QuestionFormUtilities.getRadioGroupOptionForQuestionByValue(
            question,
            answers[name] || ""
          );

        if (option) {
          return (
            <Text>
              <Text fontWeight="bold" display="inline">
                [{question?.field.properties.name}]: {question?.field.prompt}
              </Text>
              <Text display="inline" marginLeft={4}>
                {option.label}
              </Text>
            </Text>
          );
        }
      })}
    </>
  );
};
