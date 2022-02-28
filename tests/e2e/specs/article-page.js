describe("Test article page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.setLocalStorage();
    cy.visit("/");
  });

  it("Visits article page w/ content", () => {
    cy.visit("/article/1");
    cy.contains("h1", "Test");
  });

  it("Returns to main", () => {
    cy.visit("/article/1");
    cy.get('[data-test="back"]').click();
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("Visits article page w/o content", () => {
    cy.visit("/article/100");
    cy.contains("h1", "Nothing found");
  });
});
