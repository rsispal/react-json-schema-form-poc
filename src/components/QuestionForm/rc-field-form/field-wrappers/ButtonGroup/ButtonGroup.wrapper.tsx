import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import {
  ButtonGroupProperties,
  LinkButtonProperties,
  NextQuestionButtonProperties,
  Question,
  SubmitButtonProperties,
  SupportedFormField,
} from "../../QuestionForm.types";
import { NextQuestionButtonWrapper } from "../NextQuestionButton/NextQuestionButton.wrapper";
import { LinkButtonWrapper } from "../LinkButton/LinkButton.wrapper";
import { SubmitButtonWrapper } from "../SubmitButton/SubmitButton.wrapper";

export const ButtonGroupWrapper: FC<{
  question: Question<ButtonGroupProperties>;
}> = ({ question }) => (
  <Flex
    flex={1}
    width={"100%"}
    flexDirection="row"
    alignItems={"space-evenly"}
    justifyContent={"space-evenly"}
  >
    {question.properties.buttons.map((btn, i) => {
      switch (btn.type) {
        case SupportedFormField.LinkButton: {
          return (
            <LinkButtonWrapper
              key={i}
              question={btn as Question<LinkButtonProperties>}
            />
          );
        }
        case SupportedFormField.NextQuestionButton: {
          return (
            <NextQuestionButtonWrapper
              key={i}
              question={btn as Question<NextQuestionButtonProperties>}
            />
          );
        }
        case SupportedFormField.SubmitButton: {
          return (
            <SubmitButtonWrapper
              key={i}
              question={btn as Question<SubmitButtonProperties>}
            />
          );
        }
        default: {
          return null;
        }
      }
    })}
  </Flex>
);
