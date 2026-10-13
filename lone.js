
const prompt = require("prompt-sync")();

console.log("=== Banking Loan Eligibility Pre-Screening System ===");

const customerId = prompt("Enter Customer ID: ");
const monthlyIncome = Number(prompt("Enter Monthly Income (Rs.): "));
const loanAmount = Number(prompt("Enter Requested Loan Amount (Rs.): "));
const existingEMI = Number(prompt("Enter Existing Monthly EMI (Rs.): "));
const employmentType = prompt("Enter Employment Type (Salaried/Self-employed): ")
    .trim().toLowerCase();
const creditScore = Number(prompt("Enter Credit Score: "));

let loanEligibility = "Not Eligible";
let eligibilityCategory = "None";
let remarks = "";

if (
    monthlyIncome <= 0 ||
    loanAmount <= 0 ||
    existingEMI < 0 ||
    !Number.isFinite(monthlyIncome) ||
    !Number.isFinite(loanAmount) ||
    !Number.isFinite(existingEMI) ||
    !Number.isInteger(creditScore) ||
    creditScore < 300 ||
    creditScore > 900
) {
    remarks = "Invalid input details.";
} else if (existingEMI > monthlyIncome * 0.40) {
    remarks = "Existing EMI exceeds 40% of monthly income.";
} else if (creditScore < 650) {
    remarks = "Credit score is below the minimum requirement.";
} else if (creditScore <= 749) {
    loanEligibility = "Eligible for Consideration";
    eligibilityCategory = "Restricted";
    remarks = "Subject to bank policy and further verification.";
} else if (
    creditScore >= 750 &&
    monthlyIncome >= 30000 &&
    employmentType === "salaried"
) {
    loanEligibility = "Eligible for Consideration";
    eligibilityCategory = "Standard";
    remarks = "Meets standard-category preliminary criteria.";
} else {
    remarks = "Does not meet standard-category requirements.";
}

console.log("\n=== Preliminary Eligibility Result ===");
console.log("Customer ID:", customerId);
console.log("Employment Type:", employmentType);
console.log("Monthly Income: Rs.", monthlyIncome);
console.log("Credit Score:", creditScore);
console.log("Existing EMI: Rs.", existingEMI);
console.log("Loan Eligibility:", loanEligibility);
console.log("Eligibility Category:", eligibilityCategory);
console.log("Remarks:", remarks);
console.log("Requested Loan Amount: Rs.", loanAmount);

console.log("\nNote: This is only a preliminary assessment.");
console.log("It is not an actual loan approval.");