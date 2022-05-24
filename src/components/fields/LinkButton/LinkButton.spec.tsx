
import { LinkButtonProps } from './LinkButton.types';
import { LinkButton } from './LinkButton.component';
import { mountWithProps } from '../../cypress-component-wrapper';

describe("<LinkButton /> Component", () => {

  it('Should render the label', () => {
    mountWithProps<LinkButtonProps>(LinkButton, {
      label: "Test Button",
      url: "/test-url",
      target: "_blank",
      disabled: false
    })
    cy.get('a').contains('Test Button').should('exist');
  });

  it('Should have the url as href', () => {
    mountWithProps<LinkButtonProps>(LinkButton, {
      label: "Test Button",
      url: "/test-url",
      target: "_parent",
      disabled: false
    })
    const button = cy.get('a').contains('Test Button');
    button.should('have.attr', 'href', '/test-url');
  });

  it('Should render the label again', () => {
    mountWithProps<LinkButtonProps>(LinkButton, {
      label: "Test Button 123",
      url: "/test-url",
      target: "_blank",
      disabled: false
    })
    cy.get('a').contains('Test Button 123').should('exist');
  });
  it('Should not load a url when the button is disabled', () => {
    mountWithProps<LinkButtonProps>(LinkButton, {
      label: "Test Button",
      url: "www.google.co.uk",
      target: "_parent",
      disabled: true
    })
    const button = cy.get('a').contains('Test Button');
    button.should('have.attr', 'disabled');
  });
});