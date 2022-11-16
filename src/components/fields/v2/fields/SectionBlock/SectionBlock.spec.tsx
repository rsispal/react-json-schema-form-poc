import { SectionBlockProps } from "./SectionBlock.types";
import { SectionBlock } from "./SectionBlock.component";
import { mountWithProps } from "../../cypress-component-wrapper";

describe("<SectionBlock /> Component", () => {
  it("Should render the label", () => {
    mountWithProps<SectionBlockProps>(SectionBlock, {
      title: "This is the title",
      description: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              value: "Lorem ipsum dolor sit amet.",
            },
          ],
        },
      ],
    });
    // cy.get("button").contains("Test Button").should("exist");
    cy.get("p").contains("This is the title").should("exist");
    cy.get("p").contains("Lorem ipsum dolor sit amet.").should("exist");
  });
});
