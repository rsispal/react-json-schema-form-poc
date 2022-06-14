import { Box, Text } from "@chakra-ui/react";
import { mountWithProps } from "../../cypress-component-wrapper";
import { QuestionForm } from "./QuestionForm.component";

import { ButtonGroupWrapper } from "./field-wrappers/ButtonGroup/ButtonGroup.wrapper";
import { LinkButtonWrapper } from "./field-wrappers/LinkButton/LinkButton.wrapper";
import { NextQuestionButtonWrapper } from "./field-wrappers/NextQuestionButton/NextQuestionButton.wrapper";
import { PromptWrapper } from "./field-wrappers/Prompt/Prompt.wrapper";
import { RadioGroupWrapper } from "./field-wrappers/RadioGroup/RadioGroup.wrapper";
import { SubmitButtonWrapper } from "./field-wrappers/SubmitButton/SubmitButton.wrapper";
import { TextInputWrapper } from "./field-wrappers/TextInput/TextInput.wrapper";
import { WarningWrapper } from "./field-wrappers/Warning/Warning.wrapper";

import SeedQuestions from "../../../__SEED__/basic.json";

import { QuestionSchema, QuestionFormProps } from "./QuestionForm.types";

describe("<QuestionForm /> Page", () => {
  let onSubmitCallback: typeof cy.stub;
  let onEndFormClickCallback: typeof cy.stub;

  beforeEach(() => {
    onSubmitCallback = cy.stub();
    onEndFormClickCallback = cy.stub();
    mountWithProps<QuestionFormProps>(QuestionForm, {
      ...(SeedQuestions as unknown as QuestionSchema),
      showAllQuestions: false,
      onSubmitCallback,
      onEndFormClickCallback,
      renderQuestion: (children) => (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="xl"
          padding={6}
          margin={6}
        >
          {children}
        </Box>
      ),
      renderLinkButtonField: (props) => <LinkButtonWrapper {...props} />,
      renderRadioGroupField: (props) => <RadioGroupWrapper {...props} />,
      renderTextInputField: (props) => <TextInputWrapper {...props} />,
      renderNextQuestionButtonField: (props) => (
        <NextQuestionButtonWrapper {...props} />
      ),
      renderButtonGroupField: (props) => <ButtonGroupWrapper {...props} />,
      renderPromptField: (props) => <PromptWrapper {...props} />,
      renderWarningField: (props) => <WarningWrapper {...props} />,
      renderFieldErrorMessage: (error) => (
        <Text color="red">{error.message}</Text>
      ),
      renderSubmitButtonField: (props) => <SubmitButtonWrapper {...props} />,
    });
  });
  it("Should be able to submit a testbed form", () => {
    cy.get("p").contains("Question 0").should("exist");

    // cy.get(".chakra-radio-group > .chakra-stack > :nth-child(2)").click();
    // cy.get(
    //   ":nth-child(2) > :nth-child(1) > .chakra-radio-group > .chakra-stack > :nth-child(2)"
    // ).click();
    // cy.get('button').contains("Submit testbed form").click();
    // cy.log(onSubmitCallback.arguments)
    // cy.wrap(onSubmitCallback).should('be.called');
  });
});
