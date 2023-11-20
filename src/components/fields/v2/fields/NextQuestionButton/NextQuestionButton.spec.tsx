import { NextQuestionButtonProps } from "./NextQuestionButton.types";
import { NextQuestionButton } from "./NextQuestionButton.component";
import { mountWithProps } from "../../../../cypress-component-wrapper";

describe("<NextQuestionButton /> Component", () => {
  it("Should render the label", () => {
    mountWithProps<NextQuestionButtonProps>(NextQuestionButton, {
      label: "Test Button",
      disabled: false,
      onClickCallback: () => undefined,
    });
    cy.get("button").contains("Test Button").should("exist");
  });

  it("Should render the label again", () => {
    mountWithProps<NextQuestionButtonProps>(NextQuestionButton, {
      label: "Test Button 123",
      disabled: false,
      onClickCallback: () => undefined,
    });
    cy.get("button").contains("Test Button 123").should("exist");
  });
  it.only("Should not fire callback when the button is disabled", () => {
    let onClickCallback = cy.stub();
    mountWithProps<NextQuestionButtonProps>(NextQuestionButton, {
      label: "Test Button",
      disabled: true,
      onClickCallback,
      dataTestId: "test-candidate",
    });
    const button = cy.get("button").contains("Test Button");
    cy.get('[data-testid="test-candidate"]').click({ force: true });
    button.should("have.attr", "disabled");

    cy.wrap(onClickCallback).should("not.be.called");
  });
  it("Should fire onclick callback", () => {
    let onClickCallback = cy.stub();

    mountWithProps<NextQuestionButtonProps>(NextQuestionButton, {
      label: "Test Button",
      disabled: false,
      onClickCallback,
    });
    const button = cy.get("button").contains("Test Button");
    button.click();
    cy.wrap(onClickCallback).should("be.called");
  });
});
