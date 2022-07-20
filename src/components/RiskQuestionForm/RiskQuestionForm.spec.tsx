/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import { Box } from "@chakra-ui/react";

import { mountWithProps } from "../cypress-component-wrapper";

import { RiskQuestionForm } from "./";

import RiskQuestionsSchema from "../../__SEED__/risk_questions.json";

import { RiskQuestionFormProps } from "./RiskQuestionForm.types";

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
};

/*


# Scenarios:


## Scenario 1: 
- Q1. Do you want guidance from Pension Wise? YES
- Q1_1_Y. PensionWise button

## Scenario 2: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: A
- Q3

## Scenario 3: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
- Q1A_ButtonGroup tests
- Q1A_2 Next question button click
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3

## Scenario 4: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
- Q1A_ButtonGroup tests
- Q1A_2 Next question button click
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3-15 NO, acknowlegde warnings to continue

## Scenario 5: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3

## Scenario 6: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? YES
- Q2_1_N_A. Tell me more about HL Advice button

## Scenario 7: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? NO
- Q3

## Scenario 8: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3

## Scenario 9: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? YES
- Q2_1_N_A. Tell me more about HL Advice button

## Scenario 10: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? NO
- Q3

*/

const Scenarios = {
  0: "",
  1: `
## Scenario 1: 
- Q1. Do you want guidance from Pension Wise? YES
- Q1_1_Y. PensionWise button
  `,
  2: `
## Scenario 2: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: A
- Q3
  `,
  3: `
## Scenario 3: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
- Q1A_ButtonGroup tests
- Q1A_2 Next question button click
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3
  `,
  4: `
  ## Scenario 4: 
  - Q1. Do you want guidance from Pension Wise? NO
  - Q1_1_N. Please tell us more: B
  - Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
  - Q1A_ButtonGroup tests
  - Q1A_2 Next question button click
  - Q2. Have you received personal advice from a regulated Financial Adviser? YES
  - Q3-15 NO, acknowlegde warnings to continue
    `,
  5: `
## Scenario 5: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3
  `,
  6: `
## Scenario 6: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? YES
- Q2_1_N_A. Tell me more about HL Advice button
  `,
  7: `
## Scenario 7: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? NO
- Q3
  `,
  8: `
## Scenario 8: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3
  `,
  9: `
## Scenario 9: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? YES
- Q2_1_N_A. Tell me more about HL Advice button
  `,
  10: `
## Scenario 10: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? NO
- Q3
  `,
};

describe("<RiskQuestionForm /> Page", () => {
  let onSubmitCallback: typeof cy.stub;
  let onEndFormCallback: typeof cy.stub;

  beforeEach(() => {
    onSubmitCallback = cy.stub();
    onEndFormCallback = cy.stub();
    mountWithProps<RiskQuestionFormProps>(RiskQuestionForm, {
      schema: RiskQuestionsSchema as RiskQuestionFormProps["schema"],
      onSubmitCallback,
      onEndFormCallback,
      renderQuestion: (children) => (
        <Box
          bg="white"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="xl"
          padding={6}
          margin={6}
          width={800}
        >
          {children}
        </Box>
      ),
    });
  });

  it(`Should complete the risk question form according to scenario 1.${Scenarios[1]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_Y. LinkButton to PensionWise
    cy.findByTestId(`Q1_1_Y-link-button`)
      .should("exist")
      .should("have.text", "HELP ME BOOK PENSION WISE APPOINTMENT")
      .should(
        "have.attr",
        "href",
        "https://www.hl.co.uk/retirement/preparing/pension-wise"
      );
    cy.wrap(onSubmitCallback).should("not.have.been.called");
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });

  it(`Should complete the risk question form according to scenario 2.${Scenarios[2]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_N. Please tell us more: I've already had regulated financial advice
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "A");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1_1_N");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      0,
      "I've already had regulated financial advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      1,
      "I've already had guidance from Pension Wise"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      2,
      "I do not want to speak to Pension Wise"
    );

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q3");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 1, "No");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q4");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 1, "No");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q5");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q5",
      2,
      "N/A - I don't intend to take income"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q6");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 1, "No");

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q7");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 1, "No");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q8");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 1, "No");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q9");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 1, "No");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q10");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q10",
      2,
      "N/A – I don’t plan to make any more contributions to my pensions"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q11");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q11",
      2,
      "N/A – I’m not transferring pensions"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q12");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 1, "No");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q13");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q13",
      2,
      "N/A – I don’t receive means-tested benefits, nor expect to receive these in future"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q14");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q14",
      2,
      "N/A – I don’t have debt"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q15");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 1, "No");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");

    cy.wrap(onSubmitCallback).should("have.been.called.with", {
      Q1: "NO",
      Q1_1_N: "A",
      Q3: "YES",
      Q4: "YES",
      Q5: "YES",
      Q6: "YES",
      Q7: "YES",
      Q8: "YES",
      Q9: "YES",
      Q10: "YES",
      Q11: "YES",
      Q12: "YES",
      Q13: "YES",
      Q14: "YES",
      Q15: "YES",
    });
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });

  it(`Should complete the risk question form according to scenario 3.${Scenarios[3]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1_1_N");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      0,
      "I've already had regulated financial advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      1,
      "I've already had guidance from Pension Wise"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      2,
      "I do not want to speak to Pension Wise"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1A");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      0,
      "Yes - my circumstances have changed"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      1,
      "No - my circumstances haven't changed"
    );

    // Q1A_1. Book Pension Wise appointment button
    cy.findByTestId(`Q1A_1-link-button`)
      .should("exist")
      .should("have.text", "Help me book Pension Wise appointment")
      .should("have.attr", "target", "_parent")
      .should(
        "have.attr",
        "href",
        "https://www.hl.co.uk/retirement/preparing/pension-wise"
      );

    // Q1A_2. Next question button
    cy.findByTestId(`Q1A_2-next-question-button`)
      .should("exist")
      .should("have.text", "I'm happy with my guidance, next question")
      .click({ force: true });

    // Q2. Have you received personal advice from a regulated Financial Adviser? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      0,
      "Yes - I've had personal advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      1,
      "No - I have not had personal advice"
    );

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q3");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 1, "No");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q4");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 1, "No");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q5");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q5",
      2,
      "N/A - I don't intend to take income"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q6");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 1, "No");

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q7");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 1, "No");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q8");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 1, "No");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q9");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 1, "No");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q10");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q10",
      2,
      "N/A – I don’t plan to make any more contributions to my pensions"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q11");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q11",
      2,
      "N/A – I’m not transferring pensions"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q12");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 1, "No");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q13");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q13",
      2,
      "N/A – I don’t receive means-tested benefits, nor expect to receive these in future"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q14");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q14",
      2,
      "N/A – I don’t have debt"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q15");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 1, "No");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");

    cy.wrap(onSubmitCallback).should("have.been.called.with", {
      Q1: "NO",
      Q1_1_N: "B",
      Q1A: "YES",
      Q1A_2: true,
      Q2: "YES",
      Q3: "YES",
      Q4: "YES",
      Q5: "YES",
      Q6: "YES",
      Q7: "YES",
      Q8: "YES",
      Q9: "YES",
      Q10: "YES",
      Q11: "YES",
      Q12: "YES",
      Q13: "YES",
      Q14: "YES",
      Q15: "YES",
    });
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });

  it(`Should complete the risk question form according to scenario 3 but triggering Q3-15 warnings.${Scenarios[4]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1_1_N");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      0,
      "I've already had regulated financial advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      1,
      "I've already had guidance from Pension Wise"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      2,
      "I do not want to speak to Pension Wise"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1A");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      0,
      "Yes - my circumstances have changed"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      1,
      "No - my circumstances haven't changed"
    );

    // Q1A_1. Book Pension Wise appointment button
    cy.findByTestId(`Q1A_1-link-button`)
      .should("exist")
      .should("have.text", "Help me book Pension Wise appointment")
      .should("have.attr", "target", "_parent")
      .should(
        "have.attr",
        "href",
        "https://www.hl.co.uk/retirement/preparing/pension-wise"
      );

    // Q1A_2. Next question button
    cy.findByTestId(`Q1A_2-next-question-button`)
      .should("exist")
      .should("have.text", "I'm happy with my guidance, next question")
      .click({ force: true });

    // Q2. Have you received personal advice from a regulated Financial Adviser? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      0,
      "Yes - I've had personal advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      1,
      "No - I have not had personal advice"
    );

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q3");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 1, "No");

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q3_Warning");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q4");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 1, "No");

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q4_Warning");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q5");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q5",
      2,
      "N/A - I don't intend to take income"
    );

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q5_Warning");

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q6");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 1, "No");

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q6_Warning");

    // Q7. Do you understand the tax treatment of income withdrawals? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q7");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 1, "No");

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q7_Warning");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q8");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 1, "No");

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q8_Warning");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q9");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 1, "No");

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q9_Warning");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q10");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q10",
      2,
      "N/A – I don’t plan to make any more contributions to my pensions"
    );

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q10_Warning");

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q11");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q11",
      2,
      "N/A – I’m not transferring pensions"
    );

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q11_Warning");

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q12");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 1, "No");

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q12_Warning");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q13");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q13",
      2,
      "N/A – I don’t receive means-tested benefits, nor expect to receive these in future"
    );

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q13_Warning");

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q14");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q14",
      2,
      "N/A – I don’t have debt"
    );

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q14_Warning");

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q15");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 1, "No");

    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q15_Warning");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");
    cy.wrap(onSubmitCallback).should("have.been.called.with", {
      Q1: "NO",
      Q1_1_N: "B",
      Q1A: "YES",
      Q1A_2: true,
      Q2: "YES",
      Q3: "NO",
      Q3_Warning: true,
      Q4: "NO",
      Q4_Warning: true,
      Q5: "NO",
      Q5_Warning: true,
      Q6: "NO",
      Q6_Warning: true,
      Q7: "NO",
      Q7_Warning: true,
      Q8: "NO",
      Q8_Warning: true,
      Q9: "NO",
      Q9_Warning: true,
      Q10: "NO",
      Q10_Warning: true,
      Q11: "NO",
      Q11_Warning: true,
      Q12: "NO",
      Q12_Warning: true,
      Q13: "NO",
      Q13_Warning: true,
      Q14: "NO",
      Q14_Warning: true,
      Q15: "NO",
      Q15_Warning: true,
    });
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });

  it(`Should complete the risk question form according to scenario 5.${Scenarios[5]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1_1_N");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      0,
      "I've already had regulated financial advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      1,
      "I've already had guidance from Pension Wise"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      2,
      "I do not want to speak to Pension Wise"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1A");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      0,
      "Yes - my circumstances have changed"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      1,
      "No - my circumstances haven't changed"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      0,
      "Yes - I've had personal advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      1,
      "No - I have not had personal advice"
    );

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q3");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 1, "No");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q4");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 1, "No");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q5");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q5",
      2,
      "N/A - I don't intend to take income"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q6");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 1, "No");

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q7");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 1, "No");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q8");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 1, "No");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q9");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 1, "No");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q10");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q10",
      2,
      "N/A – I don’t plan to make any more contributions to my pensions"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q11");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q11",
      2,
      "N/A – I’m not transferring pensions"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q12");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 1, "No");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q13");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q13",
      2,
      "N/A – I don’t receive means-tested benefits, nor expect to receive these in future"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q14");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q14",
      2,
      "N/A – I don’t have debt"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q15");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 1, "No");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");
    cy.wrap(onSubmitCallback).should("have.been.called.with", {
      Q1: "NO",
      Q1_1_N: "B",
      Q1A: "NO",
      Q2: "YES",
      Q3: "YES",
      Q4: "YES",
      Q5: "YES",
      Q6: "YES",
      Q7: "YES",
      Q8: "YES",
      Q9: "YES",
      Q10: "YES",
      Q11: "YES",
      Q12: "YES",
      Q13: "YES",
      Q14: "YES",
      Q15: "YES",
    });
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });

  it(`Should complete the risk question form according to scenario 6.${Scenarios[6]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1_1_N");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      0,
      "I've already had regulated financial advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      1,
      "I've already had guidance from Pension Wise"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      2,
      "I do not want to speak to Pension Wise"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1A");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      0,
      "Yes - my circumstances have changed"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      1,
      "No - my circumstances haven't changed"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      0,
      "Yes - I've had personal advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      1,
      "No - I have not had personal advice"
    );

    // Q2_1_N. Would you like to learn more about HL's Advice Service? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "YES");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      0,
      "I'd like to learn more about HL's Advice Service"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      1,
      "I do not want advice"
    );

    // Q2_1_N_A. Tell me more about HL Advice button
    cy.findByTestId(`Q2_1_N_A-link-button`)
      .should("exist")
      .should("have.text", "Tell me more about HL Advice")
      .should("have.attr", "target", "_parent")
      .should(
        "have.attr",
        "href",
        "https://www.hl.co.uk/financial-advice/retirement-advice-services"
      );
    cy.wrap(onSubmitCallback).should("not.have.been.called");
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });

  it(`Should complete the risk question form according to scenario 7.${Scenarios[7]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1_1_N");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      0,
      "I've already had regulated financial advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      1,
      "I've already had guidance from Pension Wise"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      2,
      "I do not want to speak to Pension Wise"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1A");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      0,
      "Yes - my circumstances have changed"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1A",
      1,
      "No - my circumstances haven't changed"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      0,
      "Yes - I've had personal advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      1,
      "No - I have not had personal advice"
    );

    // Q2_1_N. Would you like to learn more about HL's Advice Service? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "NO");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      0,
      "I'd like to learn more about HL's Advice Service"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      1,
      "I do not want advice"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2_1_N");

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q3");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 1, "No");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q4");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 1, "No");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q5");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q5",
      2,
      "N/A - I don't intend to take income"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q6");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 1, "No");

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q7");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 1, "No");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q8");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 1, "No");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q9");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 1, "No");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q10");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q10",
      2,
      "N/A – I don’t plan to make any more contributions to my pensions"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q11");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q11",
      2,
      "N/A – I’m not transferring pensions"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q12");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 1, "No");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q13");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q13",
      2,
      "N/A – I don’t receive means-tested benefits, nor expect to receive these in future"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q14");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q14",
      2,
      "N/A – I don’t have debt"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q15");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 1, "No");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");
    cy.wrap(onSubmitCallback).should("have.been.called.with", {
      Q1: "NO",
      Q1_1_N: "B",
      Q1A: "NO",
      Q2: "NO",
      Q2_1_N: "NO",
      Q3: "YES",
      Q4: "YES",
      Q5: "YES",
      Q6: "YES",
      Q7: "YES",
      Q8: "YES",
      Q9: "YES",
      Q10: "YES",
      Q11: "YES",
      Q12: "YES",
      Q13: "YES",
      Q14: "YES",
      Q15: "YES",
    });
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });

  it(`Should complete the risk question form according to scenario 8.${Scenarios[8]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_N. Please tell us more: I do not want to speak to Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "C");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1_1_N");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      0,
      "I've already had regulated financial advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      1,
      "I've already had guidance from Pension Wise"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      2,
      "I do not want to speak to Pension Wise"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      0,
      "Yes - I've had personal advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      1,
      "No - I have not had personal advice"
    );

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q3");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 1, "No");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q4");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 1, "No");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q5");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q5",
      2,
      "N/A - I don't intend to take income"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q6");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 1, "No");

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q7");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 1, "No");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q8");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 1, "No");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q9");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 1, "No");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q10");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q10",
      2,
      "N/A – I don’t plan to make any more contributions to my pensions"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q11");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q11",
      2,
      "N/A – I’m not transferring pensions"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q12");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 1, "No");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q13");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q13",
      2,
      "N/A – I don’t receive means-tested benefits, nor expect to receive these in future"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q14");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q14",
      2,
      "N/A – I don’t have debt"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q15");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 1, "No");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");
    cy.wrap(onSubmitCallback).should("have.been.called.with", {
      Q1: "NO",
      Q1_1_N: "C",
      Q2: "YES",
      Q3: "YES",
      Q4: "YES",
      Q5: "YES",
      Q6: "YES",
      Q7: "YES",
      Q8: "YES",
      Q9: "YES",
      Q10: "YES",
      Q11: "YES",
      Q12: "YES",
      Q13: "YES",
      Q14: "YES",
      Q15: "YES",
    });
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });

  it(`Should complete the risk question form according to scenario 9.${Scenarios[9]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_N. Please tell us more: I do not want to speak to Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "C");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1_1_N");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      0,
      "I've already had regulated financial advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      1,
      "I've already had guidance from Pension Wise"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      2,
      "I do not want to speak to Pension Wise"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      0,
      "Yes - I've had personal advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      1,
      "No - I have not had personal advice"
    );

    // Q2_1_N. Would you like to learn more about HL's Advice Service? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "YES");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      0,
      "I'd like to learn more about HL's Advice Service"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      1,
      "I do not want advice"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2_1_N");

    // Q2_1_N_A. Tell me more about HL Advice button
    cy.findByTestId(`Q2_1_N_A-link-button`)
      .should("exist")
      .should("have.text", "Tell me more about HL Advice")
      .should("have.attr", "target", "_parent")
      .should(
        "have.attr",
        "href",
        "https://www.hl.co.uk/financial-advice/retirement-advice-services"
      );
    cy.wrap(onSubmitCallback).should("not.have.been.called");
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });

  it(`Should complete the risk question form according to scenario 10.${Scenarios[10]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1",
      0,
      "Yes - help me book a Pension Wise appointment"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q1", 1, "No");

    // Q1_1_N. Please tell us more: I do not want to speak to Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "C");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q1_1_N");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      0,
      "I've already had regulated financial advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      1,
      "I've already had guidance from Pension Wise"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q1_1_N",
      2,
      "I do not want to speak to Pension Wise"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      0,
      "Yes - I've had personal advice"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2",
      1,
      "No - I have not had personal advice"
    );

    // Q2_1_N. Would you like to learn more about HL's Advice Service? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "NO");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      0,
      "I'd like to learn more about HL's Advice Service"
    );
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q2_1_N",
      1,
      "I do not want advice"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q2_1_N");

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q3");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q3", 1, "No");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q4");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q4", 1, "No");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q5");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q5", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q5",
      2,
      "N/A - I don't intend to take income"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q6");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q6", 1, "No");

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q7");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q7", 1, "No");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q8");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q8", 1, "No");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q9");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q9", 1, "No");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q10");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q10", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q10",
      2,
      "N/A – I don’t plan to make any more contributions to my pensions"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q11");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q11", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q11",
      2,
      "N/A – I’m not transferring pensions"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q12");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q12", 1, "No");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q13");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q13", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q13",
      2,
      "N/A – I don’t receive means-tested benefits, nor expect to receive these in future"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q14");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q14", 1, "No");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel(
      "Q14",
      2,
      "N/A – I don’t have debt"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );
    QuestionFormTestUtilities.ensureNoQuestionDescriptionText("Q15");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 0, "Yes");
    QuestionFormTestUtilities.verifyRadioGroupOptionLabel("Q15", 1, "No");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");
    cy.wrap(onSubmitCallback).should("have.been.called.with", {
      Q1: "NO",
      Q1_1_N: "C",
      Q2: "NO",
      Q2_1_N: "NO",
      Q3: "YES",
      Q4: "YES",
      Q5: "YES",
      Q6: "YES",
      Q7: "YES",
      Q8: "YES",
      Q9: "YES",
      Q10: "YES",
      Q11: "YES",
      Q12: "YES",
      Q13: "YES",
      Q14: "YES",
      Q15: "YES",
    });
    cy.wrap(onEndFormCallback).should("not.have.been.called");
  });
});
