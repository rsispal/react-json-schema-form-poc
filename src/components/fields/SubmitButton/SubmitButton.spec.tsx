import { SubmitButtonProps } from "./SubmitButton.types";
import { SubmitButton } from "./SubmitButton.component";
import { mountWithProps } from "../../cypress-component-wrapper";

describe("<SubmitButton /> Component", () => {
  it("Should render the label", () => {
    mountWithProps<SubmitButtonProps>(SubmitButton, {
      label: "Test Button",
      disabled: false,
    });
    cy.get("a").contains("Test Button").should("exist");
  });
  it("Should have disabled attribute", () => {
    mountWithProps<SubmitButtonProps>(SubmitButton, {
      label: "Test Button",
      disabled: true,
    });
    const button = cy.get("a").contains("Test Button");
    button.should("have.attr", "disabled");
  });
});
