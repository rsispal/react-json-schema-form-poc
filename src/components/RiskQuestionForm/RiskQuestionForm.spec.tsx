/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import { Box } from "@chakra-ui/react";

import { mountWithProps } from "../cypress-component-wrapper";

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
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3

## Scenario 5: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? YES
- Q2_1_N_A. Tell me more about HL Advice button

## Scenario 6: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? NO
- Q3

## Scenario 7: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3

## Scenario 8: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? YES
- Q2_1_N_A. Tell me more about HL Advice button

## Scenario 9: 
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
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3
  `,
  5: `
## Scenario 5: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? YES
- Q2_1_N_A. Tell me more about HL Advice button
  `,
  6: `
## Scenario 6: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: B
- Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? NO
- Q3
  `,
  7: `
## Scenario 7: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? YES
- Q3
  `,
  8: `
## Scenario 8: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? YES
- Q2_1_N_A. Tell me more about HL Advice button
  `,
  9: `
## Scenario 9: 
- Q1. Do you want guidance from Pension Wise? NO
- Q1_1_N. Please tell us more: C
- Q2. Have you received personal advice from a regulated Financial Adviser? NO
- Q2_1_N. Would you like to learn more about HL's Advice Service? NO
- Q3
  `,
};

const QuestionFormTestUtilities = {
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

    // Q1_1_Y. LinkButton to PensionWise
    cy.findByTestId(`Q1_1_Y-link-button`)
      .should("exist")
      .should("have.text", "HELP ME BOOK PENSION WISE APPOINTMENT")
      .should(
        "have.attr",
        "href",
        "https://www.hl.co.uk/retirement/preparing/pension-wise"
      );
  });

  it(`Should complete the risk question form according to scenario 2.${Scenarios[2]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");

    // Q1_1_N. Please tell us more: I've already had regulated financial advice
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "A");

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");

    // Q7. Do you understand the tax treatment of income withdrawals?
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers?
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans?
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive?
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");

    // TODO: Form submit callback payload needs checking
    // TODO: RadioGroup prompt and option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 3.${Scenarios[3]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "YES");

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

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");

    // Q7. Do you understand the tax treatment of income withdrawals?
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers?
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans?
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive?
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");

    // TODO: Form submit callback payload needs checking
    // TODO: RadioGroup prompt and option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 3 but triggering Q3-15 warnings.${Scenarios[3]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "YES");

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

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q3_Warning");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q4_Warning");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q5_Warning");

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q6_Warning");

    // Q7. Do you understand the tax treatment of income withdrawals?
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q7_Warning");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers?
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q8_Warning");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q9_Warning");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q10_Warning");

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q11_Warning");

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans?
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q12_Warning");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive?
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q13_Warning");

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q14_Warning");

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "NO");
    // Acknowledge warning for this question
    QuestionFormTestUtilities.acknowledgeWarning("Q15_Warning");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");

    // TODO: Form submit callback payload needs checking
    // TODO: RadioGroup prompt and option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 4.${Scenarios[4]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "NO");

    // Q2. Have you received personal advice from a regulated Financial Adviser? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "YES");

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");

    // Q7. Do you understand the tax treatment of income withdrawals?
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers?
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans?
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive?
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");

    // TODO: Form submit callback payload needs checking
    // TODO: RadioGroup prompt and option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 5.${Scenarios[5]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "NO");

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");

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
  });

  it(`Should complete the risk question form according to scenario 6.${Scenarios[6]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");

    // Q1_1_N. Please tell us more: I've already had guidance from Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "B");

    // Q1A. Have your circumstances changed since you had Pension Wise guidance? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1A", "NO");

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");

    // Q2_1_N. Would you like to learn more about HL's Advice Service? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "NO");

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");

    // Q7. Do you understand the tax treatment of income withdrawals?
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers?
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans?
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive?
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");

    // TODO: Form submit callback payload needs checking
    // TODO: RadioGroup prompt and option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 7.${Scenarios[7]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");

    // Q1_1_N. Please tell us more: I do not want to speak to Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "C");

    // Q2. Have you received personal advice from a regulated Financial Adviser? YES
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "YES");

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");

    // Q7. Do you understand the tax treatment of income withdrawals?
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers?
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans?
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive?
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");

    // TODO: Form submit callback payload needs checking
    // TODO: RadioGroup prompt and option text needs checking
    // TODO: Description text needs checking
  });

  it(`Should complete the risk question form according to scenario 8.${Scenarios[8]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");

    // Q1_1_N. Please tell us more: I do not want to speak to Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "C");

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");

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
  });

  it(`Should complete the risk question form according to scenario 9.${Scenarios[9]}`, () => {
    cy.viewport("macbook-11");

    // Q1. Do you want guidance from Pension Wise? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q1", "NO");

    // Q1_1_N. Please tell us more: I do not want to speak to Pension Wise
    QuestionFormTestUtilities.checkRadioGroupOption("Q1_1_N", "C");

    // Q2. Have you received personal advice from a regulated Financial Adviser? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2", "NO");

    // Q2_1_N. Would you like to learn more about HL's Advice Service? NO
    QuestionFormTestUtilities.checkRadioGroupOption("Q2_1_N", "NO");

    // Q3. Are you happy to take responsibility for your retirement income, including where you invest, and will you review these regularly?
    QuestionFormTestUtilities.checkRadioGroupOption("Q3", "YES");

    // Q4. Do you understand you could run out of money earlier than planned in drawdown, if things don’t go the way you want?
    QuestionFormTestUtilities.checkRadioGroupOption("Q4", "YES");

    // Q5. If you intend to draw income, do you understand how this might be generated from investments and why drawing from capital carries additional risks?
    QuestionFormTestUtilities.checkRadioGroupOption("Q5", "YES");

    // Q6. In poor market conditions, could you afford to limit your withdrawals to reflect the performance of your chosen investments?
    QuestionFormTestUtilities.checkRadioGroupOption("Q6", "YES");

    // Q7. Do you understand the tax treatment of income withdrawals?
    QuestionFormTestUtilities.checkRadioGroupOption("Q7", "YES");

    // Q8. Have you shopped around to compare your retirement options and the services available from different providers?
    QuestionFormTestUtilities.checkRadioGroupOption("Q8", "YES");

    // Q9. Have you considered how charges might affect your drawdown plan or any other retirement options you’ve considered?
    QuestionFormTestUtilities.checkRadioGroupOption("Q9", "YES");

    // Q10. If you intend to make further contributions to your money-purchase pensions (including your SIPP), will they total less than £4,000 each tax year?
    QuestionFormTestUtilities.checkRadioGroupOption("Q10", "YES");

    // Q11. Have you checked you’re not giving up valuable benefits or guarantees, or will need to pay high exit penalties by transferring your pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q11", "YES");

    // Q12. Have you considered the effects of inflation (i.e. rising prices) on your plans?
    QuestionFormTestUtilities.checkRadioGroupOption("Q12", "YES");

    // Q13. Do you understand how taking your pension could affect any means-tested state benefits you receive?
    QuestionFormTestUtilities.checkRadioGroupOption("Q13", "YES");

    // Q14. Do you understand the implications of taking money from your pension where you have debt (e.g. loans, mortgages, credit cards)?
    QuestionFormTestUtilities.checkRadioGroupOption("Q14", "YES");

    // Q15. Are you aware that investment scams exist which target people who’ve withdrawn, or plan to withdraw, money from their pension?
    QuestionFormTestUtilities.checkRadioGroupOption("Q15", "YES");

    // Submit button
    QuestionFormTestUtilities.clickSubmitButton("Form_Submit");

    // TODO: Form submit callback payload needs checking
    // TODO: RadioGroup prompt and option text needs checking
    // TODO: Description text needs checking
  });
});
