describe("Test header", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.setLocalStorage();
  });

  it("Visits about page", () => {
    cy.visit("/");
    cy.get('[data-test="about"]').click();
    cy.contains("h1", "This is an about page");
  });

  it("Tests active link", () => {
    cy.get('[data-test="home"]').click();
    cy.get('[data-test="home"]').should("have.class", "router-link-active");
  });

  it("Tests logo click", () => {
    cy.get('[data-test="about"]').click();
    cy.get('[data-test="logo"]').click();
    cy.contains("h1", "This is a home page");
  });

  it("Tests language switcher", () => {
    cy.get('[data-test="ru"]').click();
    cy.contains('[data-test="home"]', "Главная");
  });

  it("Tests logout button", () => {
    cy.get('[data-test="logout"]').click();
    cy.url().should("include", "/login");
  });
});
