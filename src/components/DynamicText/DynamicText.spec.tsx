import {
  DynamicTextParagraph,
  DynamicTextProps,
  TextItem,
  URLItem,
} from "./DynamicText.types";
import { DynamicText } from "./DynamicText.component";
import { mountWithProps } from "../cypress-component-wrapper";

const sampleData: DynamicTextParagraph[] = [
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        value: "Paragraph 1. This is some text. ",
      },
      {
        type: "url",
        url: "https://google.co.uk",
        label: "This is a URL",
        target: "_blank",
      },
      {
        type: "text",
        value: ". This is some more text",
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        value: "Paragraph 2. This is some text. ",
      },
      {
        type: "url",
        url: "https://google.co.uk",
        label: "This is a URL",
        target: "_blank",
      },
      {
        type: "text",
        value: ". This is some more text",
      },
    ],
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
