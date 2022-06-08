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
  LinkButtonProperties,
  NextQuestionButtonProperties,
  PromptProperties,
  Question,
  SupportedFormField,
  WarningProperties,
} from "../QuestionForm/rc-field-form/QuestionForm.types";
import { DynamicText } from "../DynamicText";

export const BackOfficeQuestionResults: FC<BackOfficeQuestionResultsProps> = ({
  answers = {},
  schema,
}) => {
  const tableBg = useColorModeValue("white", "gray.700");

  const getQuestionType = (question: Question) => {
    switch (question.type) {
      case SupportedFormField.RadioGroup: {
        return "Radio Group";
      }
      case SupportedFormField.LinkButton: {
        return "Link Button";
      }
      case SupportedFormField.TextInput: {
        return "Text Input";
      }
      case SupportedFormField.Prompt: {
        return "Prompt";
      }
      case SupportedFormField.Warning: {
        return "Warning";
      }
      case SupportedFormField.NextQuestionButton: {
        return "Next Question Button";
      }
      case SupportedFormField.SubmitButton: {
        return "Submit Button";
      }
      case SupportedFormField.ButtonGroup: {
        return "Button Group";
      }
      default: {
        return "Unknown";
      }
    }
  };

  const getQuestionPrompt = (question: Question) => {
    switch (question.type) {
      case SupportedFormField.RadioGroup:
      case SupportedFormField.TextInput: {
        return question.prompt ?? "";
      }
      case SupportedFormField.LinkButton: {
        const { label, url } = question.properties as LinkButtonProperties;
        return `${label} (${url})`;
      }

      case SupportedFormField.NextQuestionButton: {
        return (question.properties as NextQuestionButtonProperties).label;
      }

      case SupportedFormField.Prompt:
      case SupportedFormField.Warning: {
        return (
          <DynamicText
            data={
              (question.properties as WarningProperties | PromptProperties)
                .prompt
            }
          />
        );
      }
      default: {
        return "-";
      }
    }
  };

  const getAnswer = (
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
      case SupportedFormField.Prompt:
      case SupportedFormField.Warning: {
        return Boolean(answers[question.name])
          ? "User acknowledged"
          : "User didn't acknowledge";
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
    const name = question.name;
    const type = getQuestionType(question);
    const prompt = getQuestionPrompt(question);
    const answer = getAnswer(question, answers);
    return (
      <Tr key={name}>
        <Td>{name}</Td>
        <Td>{type}</Td>
        <Td>{prompt}</Td>
        <Td>{answer}</Td>
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
            <Th width={"fit-content"}>Type</Th>
            <Th width={"fit-content"}>Question</Th>
            <Th width={"fit-content"}>Answer</Th>
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
