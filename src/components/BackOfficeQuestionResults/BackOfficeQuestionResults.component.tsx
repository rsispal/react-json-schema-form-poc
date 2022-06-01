import { FC } from "react";
import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

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
  const tableBg = useColorModeValue("white", "gray.700");

  const getFormattedAnswerForQuestion = (
    question: Question,
    answers: BackOfficeQuestionResultsProps["answers"] = {}
  ) => {
    switch (question.type) {
      case SupportedFormField.RadioGroup: {
        const currentAnswer = (answers[question.name] as string) ?? "";
        const option =
          QuestionFormUtilities.getRadioGroupOptionForQuestionByValue(
            question,
            currentAnswer
          );

        return option?.label;
      }
      case SupportedFormField.LinkButton: {
        return Boolean(answers[question.name])
          ? "Link clicked"
          : "Link not clicked";
      }
      default: {
        return answers[question.name];
      }
    }
  };

  const renderQuestionAndAnswer = (
    question: Question,
    answers: Record<string, string | boolean | undefined>
  ) => {
    return (
      <Tr key={question.name}>
        <Td>{question?.name}</Td>
        <Td>{question?.prompt}</Td>
        <Td>{getFormattedAnswerForQuestion(question, answers)}</Td>
      </Tr>
    );
  };

  return (
    <Box bg={tableBg}>
      <Table variant="simple">
        <TableCaption>Current submission results</TableCaption>
        <Thead>
          <Tr>
            <Th width={"fit-content"}>#</Th>
            <Th>Question</Th>
            <Th>Answer</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(answers).map((name) => {
            const question = QuestionFormUtilities.getQuestionByName(
              schema.questions,
              name
            );
            if (!question) {
              return null;
            }
            return renderQuestionAndAnswer(question, answers);
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
