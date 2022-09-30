/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { mountWithProps } from "../../cypress-component-wrapper";
import { QuestionForm } from "./QuestionForm.component";
import { QuestionField } from "./QuestionField/";

import { ButtonGroupFieldWrapper } from "./field-wrappers/ButtonGroup";
import { LinkButtonFieldWrapper } from "./field-wrappers/LinkButton";
import { NextQuestionButtonFieldWrapper } from "./field-wrappers/NextQuestionButton";
import { PromptFieldWrapper } from "./field-wrappers/Prompt";
import { RadioGroupFieldWrapper } from "./field-wrappers/RadioGroup";
import { SubmitButtonFieldWrapper } from "./field-wrappers/SubmitButton";
import { TextInputFieldWrapper } from "./field-wrappers/TextInput";
import { WarningFieldWrapper } from "./field-wrappers/Warning";
import { SectionBlockFieldWrapper } from "./field-wrappers/SectionBlock";

import SeedQuestions from "../../../__SEED__/e2e.json";

import { QuestionSchema, QuestionFormProps } from "./QuestionForm.types";

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
    cy.findByTestId(`${testId}-next-question-button`)
      .should("exist")
      .scrollIntoView()
      .click({ force: true });
  },
  acknowledgeWarning: (testId: string) => {
    cy.findByTestId(`${testId}-warning`).within(() => {
      cy.findByTestId("acknowledge-button")
        .should("exist")
        .scrollIntoView()
        .click({ force: true });
    });
  },
  acknowledgePrompt: (testId: string) => {
    cy.findByTestId(`${testId}-prompt`).within(() => {
      cy.findByTestId("acknowledge-button")
        .should("exist")
        .scrollIntoView()
        .click({ force: true });
    });
  },
  fillTextInput: (testId: string, value: string) => {
    cy.findByTestId(`${testId}-text-input`)
      .should("exist")
      .scrollIntoView()
      .type(value, { force: true });
  },
  clickSubmitButton: (testId: string) => {
    cy.findByTestId(`${testId}-submit-button`)
      .scrollIntoView()
      .click({ force: true });
  },
  verifyQuestionPromptText: (testId: string, expected: string) =>
    cy
      .findByTestId(`${testId}-question-prompt-text`)
      .should("exist")
      .should("have.text", expected),
  ensureNoQuestionDescriptionText: (testId: string) =>
    cy.findByTestId(`${testId}-question-description-text`).should("not.exist"),
  verifyQuestionDescriptionText: (testId: string, expected: string) =>
    cy
      .findByTestId(`${testId}-question-description-text`)
      .should("exist")
      .should("have.text", expected),
  verifyRadioGroupOptionLabel: (
    testId: string,
    index: number,
    value: string
  ) => {
    cy.findByTestId(`${testId}-radio-group`).within(() => {
      cy.get("label").eq(index).should("have.text", value);
    });
  },
  ensureWarningHasAcknowledgeButton: (testId: string, label: string) => {
    cy.findByTestId(`${testId}-warning`).within(() => {
      cy.findByTestId("acknowledge-button")
        .should("exist")
        .scrollIntoView()
        .should("have.text", label);
    });
  },
  ensureWarningHasEndFormButton: (testId: string, label: string) => {
    cy.findByTestId(`${testId}-warning`).within(() => {
      cy.findByTestId("end-form-button")
        .should("exist")
        .scrollIntoView()
        .should("have.text", label);
    });
  },
  verifyWarningText: (testId: string, expected: string) =>
    cy.findByTestId(`${testId}-warning`).within(() => {
      cy.findByTestId(`warning-text`)
        .should("exist")
        .scrollIntoView()
        .should("have.text", expected);
    }),
};

describe("<QuestionForm /> Page", () => {
  let onSubmitCallback: typeof cy.stub;
  let onEndFormClickCallback: typeof cy.stub;

  beforeEach(() => {
    onSubmitCallback = cy.stub();
    onEndFormClickCallback = cy.stub();
    mountWithProps<QuestionFormProps>(QuestionForm, {
      ...(SeedQuestions as unknown as QuestionSchema),
      onSubmitCallback,
      onEndFormClickCallback,
      children: ({
        form,
        questionsToRender,
        values,
        errors,
        allQuestions,
        onEndFormClickCallback,
      }) =>
        questionsToRender.map((question, key) => (
          <QuestionField
            key={key}
            form={form}
            question={question}
            questions={allQuestions}
            renderQuestion={(children) => (
              <Box
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="xl"
                padding={6}
                margin={6}
              >
                {children}
              </Box>
            )}
            values={values}
            errors={errors}
            onEndFormClickCallback={onEndFormClickCallback}
            renderLinkButtonField={(props) => (
              <LinkButtonFieldWrapper {...props} />
            )}
            renderRadioGroupField={(props) => (
              <RadioGroupFieldWrapper {...props} />
            )}
            renderTextInputField={(props) => (
              <TextInputFieldWrapper {...props} />
            )}
            renderNextQuestionButtonField={(props) => (
              <NextQuestionButtonFieldWrapper {...props} />
            )}
            renderButtonGroupField={(props) => (
              <ButtonGroupFieldWrapper {...props} />
            )}
            renderPromptField={(props) => <PromptFieldWrapper {...props} />}
            renderWarningField={(props) => <WarningFieldWrapper {...props} />}
            renderSubmitButtonField={(props) => (
              <SubmitButtonFieldWrapper {...props} />
            )}
            renderSectionBlockField={(props) => (
              <SectionBlockFieldWrapper {...props} />
            )}
            renderFieldErrorMessage={(error) => (
              <Text style={{ color: "red" }}>{error.message}</Text>
            )}
          />
        )),
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
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      0,
      "Yes (show a link button)"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q2", 1, "No");

    QuestionFormTestUtilities.acknowledgeWarning("Q2_Warning");

    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "A");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      0,
      "Option A"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      1,
      "Option B"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      2,
      "Option C (show a link button)"
    );

    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 1, "No");

    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 1, "No");

    QuestionFormTestUtilities.fillTextInput("Q5", "abc");

    QuestionFormTestUtilities.clickSubmitButton("Q6_SubmitButton");

    cy.wrap(onEndFormClickCallback).should("not.have.been.called");
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
