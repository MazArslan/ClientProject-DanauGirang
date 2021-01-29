import { validateEmail } from "./EmailValidation";

describe("Email Validation", () => {
  // Test for EmailValidation.js with valid email
  test("Email Validation - correct email", () => {
    expect(validateEmail("james@user.com")).toBeTruthy();
  });

  // Test for EmailValidation.js with invalid email
  test("Email Validation - incorrect email", () => {
    expect(validateEmail("james@@user.com")).toBeFalsy();
  });
});
