import { luhnAlgorithm } from "./utils/luhnAlghorithm.js";

// DOM elements
const cardNumberInput = document.getElementById("cardNumber");
const validateBtn = document.getElementById("validateBtn");
const resultArea = document.getElementById("resultArea");
const exampleValid = document.getElementById("exampleValid");
const exampleInvalid = document.getElementById("exampleInvalid");

// Format card number input with spaces for readability
cardNumberInput.addEventListener("input", function (e) {
  // Remove all non-digit characters
  let value = e.target.value.replace(/\D/g, "");

  // Add spaces every 4 digits for readability
  let formattedValue = "";
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += " ";
    }
    formattedValue += value[i];
  }

  e.target.value = formattedValue;
});

// Validate button click handler
validateBtn.addEventListener("click", function () {
  // Get card number and remove any spaces
  const cardNumber = cardNumberInput.value.replace(/\s/g, "");

  // Validate that we have at least a number
  if (!cardNumber || cardNumber.length < 8) {
    showResult(false, "Please enter a valid card number (at least 8 digits)");
    return;
  }

  // Call the validation function
  const isValid = luhnAlgorithm(cardNumber);

  // Display the result
  showResult(
    isValid,
    `The card number ${formatCardNumber(cardNumber)} is ${
      isValid ? "valid" : "invalid"
    } according to the Luhn algorithm.`
  );
});

// Handle Enter key press
cardNumberInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    validateBtn.click();
  }
});

// Example card number click handlers
exampleValid.addEventListener("click", function () {
  cardNumberInput.value = "4532 0151 1283 0366";
  validateBtn.click();
});

exampleInvalid.addEventListener("click", function () {
  cardNumberInput.value = "4532 0151 1283 0361";
  validateBtn.click();
});

// Function to display the validation result
function showResult(isValid, message) {
  // Clear previous classes
  resultArea.className = "result-area";

  // Add appropriate class based on validation result
  resultArea.classList.add(isValid ? "valid-result" : "invalid-result");

  // Set content
  const icon = isValid
    ? '<i class="bi bi-check-circle result-icon"></i>'
    : '<i class="bi bi-x-circle result-icon"></i>';
  resultArea.innerHTML = `${icon} ${message}`;

  // Show result area
  resultArea.style.display = "block";
}

// Helper function to format card number for display
function formatCardNumber(cardNumber) {
  return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
}
