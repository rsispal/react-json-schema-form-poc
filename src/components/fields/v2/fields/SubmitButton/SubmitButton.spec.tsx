import { SubmitButtonProps } from "./SubmitButton.types";
import { SubmitButton } from "./SubmitButton.component";
import { mountWithProps } from "../../../../cypress-component-wrapper";

describe("<SubmitButton /> Component", () => {
  it("Should render the label", () => {
    mountWithProps<SubmitButtonProps>(SubmitButton, {
      title: "",
      subtitle: "",
      buttonLabel: "Test Button",
      disabled: false,
    });
    cy.get("button").contains("Test Button").should("exist");
  });

  it("Should have submit role", () => {
    mountWithProps<SubmitButtonProps>(SubmitButton, {
      title: "",
      subtitle: "",
      buttonLabel: "Test Button",
      disabled: false,
    });
    const button = cy.get("button").contains("Test Button");
    button.should("have.attr", "type", "submit");
  });
  it("Should have disabled attribute", () => {
    mountWithProps<SubmitButtonProps>(SubmitButton, {
      title: "",
      subtitle: "",
      buttonLabel: "Test Button",
      disabled: true,
    });
    const button = cy.get("button").contains("Test Button");
    button.should("have.attr", "disabled");
  });
});
