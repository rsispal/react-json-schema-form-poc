/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
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

import SeedQuestions from "../../../__SEED__/e2e.json";

import { QuestionSchema, QuestionFormProps } from "./QuestionForm.types";
import { fireEvent } from "@testing-library/react";

const checkRadioGroupOption = (testId: string, value: string) => {
  cy.findByTestId(`${testId}-radio-group`).within(() => {
    cy.get(`input[value="${value}"]`).scrollIntoView().click({ force: true });
  });
};

// const clickLinkButton = (testId: string) => {
//   cy.findByTestId(`${testId}-link-button`).click();
// };

const clickNextQuestionButton = (testId: string) => {
  cy.findByTestId(`${testId}-next-question-button`)
    .should("exist")
    .scrollIntoView()
    .click({ force: true });
};

const acknowledgeWarning = (testId: string) => {
  cy.findByTestId(`${testId}-warning`).within(() => {
    cy.findByTestId("acknowledge-button")
      .should("exist")
      .scrollIntoView()
      .click({ force: true });
  });
};

const acknowledgePrompt = (testId: string) => {
  cy.findByTestId(`${testId}-prompt`).within(() => {
    cy.findByTestId("acknowledge-button")
      .should("exist")
      .scrollIntoView()
      .click({ force: true });
  });
};

const fillTextInput = (testId: string, value: string) => {
  cy.findByTestId(`${testId}-text-input`)
    .should("exist")
    .scrollIntoView()
    .type(value, { force: true });
};

const clickSubmitButton = (testId: string) => {
  cy.findByTestId(`${testId}-submit-button`).scrollIntoView();
};

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
    cy.viewport("macbook-13");

    checkRadioGroupOption("Q1", "NO");
    acknowledgeWarning("Q1_Warning");
    clickNextQuestionButton("Q1_NextBtn");

    acknowledgePrompt("Q1_Prompt");

    checkRadioGroupOption("Q2", "NO");
    acknowledgeWarning("Q2_Warning");

    checkRadioGroupOption("Q2_1_N", "A");

    checkRadioGroupOption("Q3", "YES");
    checkRadioGroupOption("Q4", "YES");

    fillTextInput("Q5", "abc");

    clickSubmitButton("Q6_SubmitButton");

    // checkRadioGroupOption("Q1_1_N", "B");

    // checkRadioGroupOption("Q1A", "YES");

    // clickNextQuestionButton("Q1A_2");
    // cy.scrollTo("bottom");
  });
});
