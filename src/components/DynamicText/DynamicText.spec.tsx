import { DynamicTextProps, TextItem, URLItem } from "./DynamicText.types";
import { DynamicText } from "./DynamicText.component";
import { mountWithProps } from "../cypress-component-wrapper";

const sampleData: (TextItem | URLItem)[] = [
  {
    type: "text",
    value:
      "What you do with your pension is an important decision. If you haven't received ",
  },
  {
    type: "url",
    label: "Pension Wise ",
    url: "#",
    target: "blank",
  },
  {
    type: "text",
    value: "guidance or ",
  },
  {
    type: "url",
    label: "personal advice ",
    url: "#",
    target: "blank",
  },
  {
    type: "text",
    value: "we strongly suggest you do this before proceeding. ",
  },
];

describe("<DynamicText /> Component", () => {
  it("Should render the elements based on the data schema", () => {
    mountWithProps<DynamicTextProps>(DynamicText, {
      data: sampleData,
    });
    cy.get("p")
      .contains(
        "What you do with your pension is an important decision. If you haven't received "
      )
      .should("exist");

    cy.get("a").contains("Pension Wise ").should("exist");
    cy.get("a").contains("Pension Wise ").should("have.attr", "href", "#");

    cy.get("p").contains("guidance or ").should("exist");

    cy.get("a").contains("personal advice ").should("exist");
    cy.get("a").contains("personal advice ").should("have.attr", "href", "#");

    cy.get("p")
      .contains("we strongly suggest you do this before proceeding. ")
      .should("exist");
  });
});
