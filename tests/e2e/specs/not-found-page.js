describe("Test not found page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.setLocalStorage();
  });

  it("Visits non-existing page", () => {
    cy.visit("/f");
    cy.contains("h1", "404");
  });
});
