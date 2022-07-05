import { DynamicTextParagraph, DynamicTextProps } from "./DynamicText.types";
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

    cy.get("p").contains("Paragraph 1. This is some text. ").should("exist");
    cy.get("a").contains("This is a URL").should("exist");
    cy.get("p").contains(". This is some more text").should("exist");

    cy.get("p").contains("Paragraph 2. This is some text. ").should("exist");
    cy.get("a").contains("This is a URL").should("exist");
    cy.get("p").contains(". This is some more text").should("exist");
  });
});
