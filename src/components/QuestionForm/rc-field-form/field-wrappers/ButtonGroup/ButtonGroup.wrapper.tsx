import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import {
  ButtonGroupProperties,
  Question,
  SupportedFormField,
} from "../../QuestionForm.types";
import { NextQuestionButtonWrapper } from "../NextQuestionButton/NextQuestionButton.wrapper";
import { LinkButtonWrapper } from "../LinkButton/LinkButton.wrapper";

export const ButtonGroupWrapper: FC<{
  question: Question;
}> = ({ question }) => (
  <Flex
    flex={1}
    width={"100%"}
    flexDirection="row"
    alignItems={"space-evenly"}
    justifyContent={"space-evenly"}
  >
    {(question.properties as unknown as ButtonGroupProperties).buttons.map(
      (btn, i) => {
        switch (btn.type) {
          case SupportedFormField.LinkButton: {
            return <LinkButtonWrapper key={i} question={btn} />;
          }
          case SupportedFormField.NextQuestionButton: {
            return <NextQuestionButtonWrapper key={i} question={btn} />;
          }
          default: {
            return null;
          }
        }
      }
    )}
  </Flex>
);
