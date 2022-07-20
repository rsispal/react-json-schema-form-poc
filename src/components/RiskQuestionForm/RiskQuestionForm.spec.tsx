/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import { Box } from "@chakra-ui/react";

import { mountWithProps } from "../cypress-component-wrapper";
import { QuestionFormTestUtilities } from "../QuestionForm/rc-field-form/QuestionForm.spec";

import { RiskQuestionForm } from "./";

import RiskQuestionsSchema from "../../__SEED__/risk_questions.json";

import { RiskQuestionFormProps } from "./RiskQuestionForm.types";

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

    // Q1_1_N. Please tell us more: I've already had regulated financial advice
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "A");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );

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

    // TODO: RadioGroup option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 3.${Scenarios[3]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
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

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );

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

    // TODO: RadioGroup option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 3 but triggering Q3-15 warnings.${Scenarios[4]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
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

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    ); // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q3_Warning");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q4_Warning");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q5_Warning");

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q6_Warning");

    // Q7. Do you understand the tax treatment of income withdrawals? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q7_Warning");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q8_Warning");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q9_Warning");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q10_Warning");

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q11_Warning");

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q12_Warning");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q13_Warning");

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q14_Warning");

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );
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

    // TODO: RadioGroup option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 5.${Scenarios[5]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );

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

    // TODO: RadioGroup option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 6.${Scenarios[6]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );

    // Q2_1_N. Would you like to learn more about HL's Advice Service? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "YES");

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

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1A",
      "Have your circumstances changed since you had Pension Wise guidance?"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );

    // Q2_1_N. Would you like to learn more about HL's Advice Service? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "NO");

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );

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

    // TODO: RadioGroup option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 8.${Scenarios[8]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );

    // Q1_1_N. Please tell us more: I do not want to speak to Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "C");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );

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

    // TODO: RadioGroup option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 9.${Scenarios[9]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1",
      "Do you want guidance from Pension Wise?"
    );

    // Q1_1_N. Please tell us more: I do not want to speak to Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "C");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );

    // Q2_1_N. Would you like to learn more about HL's Advice Service? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "YES");

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

    // Q1_1_N. Please tell us more: I do not want to speak to Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "C");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q1_1_N",
      "Please tell us more"
    );

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q2",
      "Have you received personal advice from a regulated Financial Adviser?"
    );

    // Q2_1_N. Would you like to learn more about HL's Advice Service? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "NO");

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q3",
      "Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?"
    );
    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q4",
      "Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?"
    );

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q5",
      "If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?"
    );

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q6",
      "In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?"
    );

    // Q7. Do you understand the tax treatment of income withdrawals? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q7",
      "Do you understand the tax treatment of income withdrawals?"
    );

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q8",
      "Have you shopped around to compare your retirement options and the services available from different providers?"
    );

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q9",
      "Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?"
    );

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q10",
      "If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?"
    );

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q11",
      "Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?"
    );

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q12",
      "Have you considered the effects of inflation (i.e. rising prices) on your plans?"
    );

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q13",
      "Do you understand how taking your pension could affect any means-tested state benefits you receive?"
    );

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q14",
      "Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?"
    );

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");
    QuestionFormTestUtilities.verifyQuestionPromptText(
      "Q15",
      "Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?"
    );

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

    // TODO: RadioGroup option text needs checking
    // TODO: Description text needs checking
  });
});
