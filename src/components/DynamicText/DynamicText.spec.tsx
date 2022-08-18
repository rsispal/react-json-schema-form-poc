import { DynamicTextParagraph, DynamicTextProps } from "./DynamicText.types";
import { DynamicText } from "./DynamicText.component";
import { mountWithProps } from "../cypress-component-wrapper";

describe("<DynamicText /> Component", () => {
  it("Should render a single text element based on the data schema", () => {
    const sampleData: DynamicTextParagraph[] = [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            value: "Lorem ipsum dolor sit amet.",
          },
        ],
      },
    ];
    mountWithProps<DynamicTextProps>(DynamicText, {
      data: sampleData,
    });

    cy.get("p").contains("Lorem ipsum dolor sit amet.").should("exist");
  });

  it("Should render a single link element based on the data schema", () => {
    const sampleData: DynamicTextParagraph[] = [
      {
        type: "paragraph",
        content: [
          {
            type: "url",
            url: "https://google.co.uk",
            target: "_blank",
            label: "Lorem ipsum dolor sit amet.",
          },
        ],
      },
    ];
    mountWithProps<DynamicTextProps>(DynamicText, {
      data: sampleData,
    });

    cy.get("a").contains("Lorem ipsum dolor sit amet.").should("exist");
  });
  it("Should render the elements based on the data schema", () => {
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
