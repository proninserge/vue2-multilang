describe("Test home page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.setLocalStorage();
  });

  it("Visits home page", () => {
    cy.visit("/");
    cy.contains("h1", "This is a home page");
  });

  it("Tests getting of articles", () => {
    cy.get('[data-test="article-header"]').should("have.length", 5);
    cy.get('[data-test="article-header"]:first').contains("Test");
  });

  it("Tests search input", () => {
    cy.get('[data-test="search-input"]').type("New");
    cy.get('[data-test="article-header"]').contains("New");
  });

  it("Tests search input case sensitively", () => {
    cy.get('[data-test="search-input"]').clear();
    cy.get('[data-test="search-input"]').type("ARTICLE");
    cy.get('[data-test="search-input"]').blur();
    cy.get('[data-test="article-header"]').contains("Article");
  });

  it("Tests view more button", () => {
    cy.get('[data-test="search-input"]').clear();
    cy.get('[data-test="search-input"]').blur();
    cy.get('[data-test="view-more"]:first').click();
    cy.url().should("include", "/article/1");
  });

  it("Tests view mode button", () => {
    cy.visit("/");
    cy.get('[data-test="view-mode"]').click();
    cy.get('[data-test="article-container"]').should(
      "have.class",
      "block-view"
    );
  });
});
