import getRandomUnordMail from '../../utils/randomUnordMail';
import { Chance } from 'chance';
const chance = new Chance();


const email = getRandomUnordMail()
const password = chance.string({ length: 8 })
const title = chance.string({ length: 15 })
const content = chance.paragraph({ sentences: 5 })

describe("User Creation", () => {
	it("create new user", () => {
		// Start from the login page
		cy.visit("/enter");

		// Change to signup form
		cy.get("#formToogle").click();

		// Ensure we're on the signup form
		cy.get("h1").should("contain", "Sign Up");

		// Fill in the form
		cy.get('[type="email"]').type(email);
		cy.get('[type="password"]').type(password);

		// Submit the form
		cy.get('.btn-green').click();
	});

	it("check that user is logged in", () => {
		// Check that mail is visible
		cy.contains(email).should("be.visible");
	});

	it("write post", () => {
		cy.contains("Write Posts").click();

		cy.contains("Add a new Post").should("be.visible");

		cy.get('input').type(title);

		cy.get('.btn-green').click();

		cy.get('textarea').type(content);

		cy.get('[name="published"]').click();

		cy.get('.btn-green').click();

		cy.visit("/");

		cy.contains(title).should("be.visible");
	})

	it("logout", () => {

		// Logout
		cy.get(".btn-signout").click();

		// Check that login button is in navbar
		cy.contains("Login").should("be.visible");
	});
});

describe("User Login", () => {
	it("login with the user from earlier test", () => {

		// Start from the login page
		cy.visit("/enter");

		// Ensure we're on the login form
		cy.get("h1").should("contain", "Login");

		// Fill in the form
		cy.get('[type="email"]').type(email);
		cy.get('[type="password"]').type(password);

		// Submit the form
		cy.get('.btn-green').click();
	});

	it("check that user is logged in", () => {
		// Check that mail is visible
		cy.contains(email).should("be.visible");
	});

	it("logout", () => {

		// Logout again
		cy.get(".btn-signout").first().click();

		// Check that login button is in navbar
		cy.contains("Login").should("be.visible");
	});
});
