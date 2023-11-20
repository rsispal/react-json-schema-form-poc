import React from "react";
import { mountWithProps } from "../../../cypress-component-wrapper";
import { SchemaDrivenQuestionForm } from "./SchemaDrivenQuestionForm.component";

import ButtonGroupFieldWrapper from "../../../fields/v2/field-wrappers/ButtonGroup";
import LinkButtonFieldWrapper from "../../../fields/v2/field-wrappers/LinkButton";
import NextQuestionButtonFieldWrapper from "../../../fields/v2/field-wrappers/NextQuestionButton";
import PromptFieldWrapper from "../../../fields/v2/field-wrappers/Prompt";
import RadioGroupFieldWrapper from "../../../fields/v2/field-wrappers/RadioGroup";
import SubmitButtonFieldWrapper from "../../../fields/v2/field-wrappers/SubmitButton";
import TextInputFieldWrapper from "../../../fields/v2/field-wrappers/TextInput";
import WarningFieldWrapper from "../../../fields/v2/field-wrappers/Warning";
import SectionBlockFieldWrapper from "../../../fields/v2/field-wrappers/SectionBlock";

import SeedQuestions from "../../../../__SEED__/e2e.json";

import { QuestionSchema, SchemaDrivenQuestionFormProps } from "../types";
import { Box } from "@chakra-ui/react";

export const QuestionFormTestUtilities = {
  checkRadioGroupOption: (testId: string, value: string) => {
    cy.findByTestId(`${testId}-radio-group`).within(() => {
      cy.get(`input[value="${value}"]`).scrollIntoView().click({ force: true });
    });
  },
  clickLinkButton: (testId: string) => {
    cy.findByTestId(`${testId}-link-button`).click({ force: true });
  },
  clickNextQuestionButton: (testId: string) => {
    cy.findByTestId(`${testId}-next-question-button`).should("exist").scrollIntoView().click({ force: true });
  },
  acknowledgeWarning: (testId: string) => {
    cy.findByTestId(`${testId}-warning`).within(() => {
      cy.findByTestId("acknowledge-button").should("exist").scrollIntoView().click({ force: true });
    });
  },
  acknowledgePrompt: (testId: string) => {
    cy.findByTestId(`${testId}-prompt`).within(() => {
      cy.findByTestId("acknowledge-button").should("exist").scrollIntoView().click({ force: true });
    });
  },
  fillTextInput: (testId: string, value: string) => {
    cy.findByTestId(`${testId}-text-input`).should("exist").scrollIntoView().type(value, { force: true });
  },
  clickSubmitButton: (testId: string) => {
    cy.findByTestId(`${testId}-submit-button`).scrollIntoView().click({ force: true });
  },
  verifyQuestionPromptText: (testId: string, expected: string) =>
    cy.findByTestId(`${testId}-question-prompt-text`).should("exist").should("have.text", expected),
  ensureNoQuestionDescriptionText: (testId: string) => cy.findByTestId(`${testId}-question-description-text`).should("not.exist"),
  verifyQuestionDescriptionText: (testId: string, expected: string) =>
    cy.findByTestId(`${testId}-question-description-text`).should("exist").should("have.text", expected),
  verifyRadioGroupOptionLabel: (testId: string, index: number, value: string) => {
    cy.findByTestId(`${testId}-radio-group`).within(() => {
      cy.get("label").eq(index).should("have.text", value);
    });
  },
  ensureWarningHasAcknowledgeButton: (testId: string, label: string) => {
    cy.findByTestId(`${testId}-warning`).within(() => {
      cy.findByTestId("acknowledge-button").should("exist").scrollIntoView().should("have.text", label);
    });
  },
  ensureWarningHasEndFormButton: (testId: string, label: string) => {
    cy.findByTestId(`${testId}-warning`).within(() => {
      cy.findByTestId("end-form-button").should("exist").scrollIntoView().should("have.text", label);
    });
  },
  verifyWarningText: (testId: string, expected: string) =>
    cy.findByTestId(`${testId}-warning`).within(() => {
      cy.findByTestId(`warning-text`).should("exist").scrollIntoView().should("have.text", expected);
    }),
};

describe("<SchemaDrivenQuestionForm /> Tests (Version 2 Implementation - Formik)", () => {
  let onSubmitCallback: typeof cy.stub;
  let onEndFormCallback: typeof cy.stub;
  let onAnswerCallback: typeof cy.stub;

  beforeEach(() => {
    onSubmitCallback = cy.stub();
    onEndFormCallback = cy.stub();
    onAnswerCallback = cy.stub();
    mountWithProps<SchemaDrivenQuestionFormProps>(SchemaDrivenQuestionForm, {
      ...(SeedQuestions as unknown as QuestionSchema),
      onSubmitCallback,
      onEndFormCallback,
      onAnswerCallback,
      questionFieldUI: ({ children }) => (
        <Box bg="white" margin={4} p={4} w={200} maxW={200} boxShadow="xl">
          {children}
        </Box>
      ),
      fields: {
        LinkButton: LinkButtonFieldWrapper,
        RadioGroup: RadioGroupFieldWrapper,
        TextInput: TextInputFieldWrapper,
        NextQuestionButton: NextQuestionButtonFieldWrapper,
        ButtonGroup: ButtonGroupFieldWrapper,
        Prompt: PromptFieldWrapper,
        Warning: WarningFieldWrapper,
        SubmitButton: SubmitButtonFieldWrapper,
        SectionBlock: SectionBlockFieldWrapper,
      },
    });
  });
  it.only("Should be able to submit a testbed form", () => {
    cy.viewport("macbook-13");

    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    QuestionFormTestUtilities.acknowledgeWarning("Q1_Warning");
    QuestionFormTestUtilities.clickNextQuestionButton("Q1_NextBtn");

    QuestionFormTestUtilities.acknowledgePrompt("Q1_Prompt");

    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q2", 0, "Yes (show a link button)");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q2", 1, "No");

    QuestionFormTestUtilities.acknowledgeWarning("Q2_Warning");

    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "A");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q2_1_N", 0, "Option A");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q2_1_N", 1, "Option B");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q2_1_N", 2, "Option C (show a link button)");

    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 1, "No");

    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 1, "No");

    QuestionFormTestUtilities.fillTextInput("Q5", "abc");

    QuestionFormTestUtilities.clickSubmitButton("Q6_SubmitButton");

    cy.wrap(onEndFormCallback).should("not.have.been.called");
    cy.wrap(onSubmitCallback).should("have.been.called.with", {
      Q1: "NO",
      Q1_Warning: true,
      Q1_NextBtn: true,
      Q1_Prompt: true,
      Q2: "NO",
      Q2_Warning: true,
      Q2_1_N: "A",
      Q3: "YES",
      Q4: "YES",
      Q5: "abc",
    });
  });
});
