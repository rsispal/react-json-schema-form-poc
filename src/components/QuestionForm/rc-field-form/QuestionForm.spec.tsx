import { mountWithProps } from "../../cypress-component-wrapper";
import { QuestionForm } from "./QuestionForm.component";
import { QuestionSchema, QuestionFormProps } from "./QuestionForm.types";

import SeedQuestions from "../../../__SEED__/basic.json";
import { Box } from "@chakra-ui/react";

describe("<QuestionForm /> Page", () => {
  let onSubmitCallback: typeof cy.stub;

  beforeEach(() => {
    onSubmitCallback = cy.stub();
    mountWithProps<QuestionFormProps>(QuestionForm, {
      ...(SeedQuestions as unknown as QuestionSchema),
      showAllQuestions: false,
      onSubmitCallback,
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
