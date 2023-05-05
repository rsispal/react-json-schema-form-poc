import { FC } from "react";
import { Box, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";

import { QuestionFormUtilities } from "../QuestionForm/formik-v2/SchemaDrivenQuestionForm/SchemaDrivenQuestionForm.utilities";

import { BackOfficeQuestionResultsProps } from "./BackOfficeQuestionResults.types";
import {
  LinkButtonProperties,
  NextQuestionButtonProperties,
  PromptProperties,
  Question,
  QuestionFieldProperties,
  SupportedFormField,
  WarningProperties,
} from "../QuestionForm/formik-v2/types";
import { DynamicText } from "../DynamicText";

export const BackOfficeQuestionResults: FC<BackOfficeQuestionResultsProps> = ({ answers = [], schema }) => {
  const tableBg = useColorModeValue("white", "gray.700");

  const getQuestionType = (question: Question<QuestionFieldProperties>) => {
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

  const getQuestionPrompt = (question: Question<QuestionFieldProperties>) => {
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
        const data = (question.properties as WarningProperties | PromptProperties).prompt;
        return <DynamicText data={data} />;
      }
      default: {
        return "-";
      }
    }
  };

  const getAnswer = (question: Question<QuestionFieldProperties>, answers: BackOfficeQuestionResultsProps["answers"]) => {
    const filtered = answers?.filter((a) => a.name === question.id).at(0);
    if (filtered) {
      switch (question.type) {
        case SupportedFormField.RadioGroup: {
          const currentAnswer = (filtered.answer as string) ?? "";
          const option = QuestionFormUtilities.getRadioGroupOptionForQuestionByValue(question, currentAnswer);

          return option?.label;
        }
        case SupportedFormField.LinkButton: {
          return filtered.answer === "SELECTED" ? "Link clicked" : "Link not clicked";
        }
        case SupportedFormField.Prompt:
        case SupportedFormField.Warning: {
          return filtered.answer === "SELECTED" ? "User acknowledged" : "User didn't acknowledge";
        }
        default: {
          return filtered.answer;
        }
      }
    }
  };

  const renderQuestionAndAnswer = (
    question: Question<QuestionFieldProperties>,
    answers: BackOfficeQuestionResultsProps["answers"]
  ) => {
    const type = getQuestionType(question);
    const prompt = getQuestionPrompt(question);
    const answer = getAnswer(question, answers);
    return (
      <Tr key={question.id}>
        <Td>{question.id}</Td>
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
          {answers.map(({ name, answer }) => {
            const question = QuestionFormUtilities.getQuestionById(schema.questions, name);

            if (question) {
              return renderQuestionAndAnswer(question, answers);
            }
            return null;
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
