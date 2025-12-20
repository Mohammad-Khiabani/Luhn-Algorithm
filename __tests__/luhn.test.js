import { luhnAlgorithm } from "./../utils/luhnAlghorithm.js";

test("valid card number should return true", () => {
  const cardNumber = "5859831116182618";
  expect(luhnAlgorithm(cardNumber)).toBe(true);
});

test("Invalid card number sould return false", () => {
  const cardNumber = "5859831116182617";
  expect(luhnAlgorithm(cardNumber)).toBe(false);
});

test("None-Numbric input should return false", () => {
  const cardNumber = "1245s14124d";
  expect(luhnAlgorithm(cardNumber)).toBe(false);
});

test("none-string input should return false", () => {
  expect(luhnAlgorithm(1243)).toBe(false);
});
