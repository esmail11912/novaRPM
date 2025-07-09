
import { solveKnapsackReflective } from './predictor.js';

window.runSolver = function () {
  const input = document.getElementById('inputData').value.trim().split('\n');
  if (input.length < 3) {
    document.getElementById('result').textContent = "Invalid input format.";
    return;
  }

  const weights = input[0].split(',').map(x => parseInt(x.trim()));
  const values = input[1].split(',').map(x => parseInt(x.trim()));
  const capacityLine = input[2].toLowerCase().replace('capacity:', '').trim();
  const capacity = parseInt(capacityLine);

  const result = solveKnapsackReflective(weights, values, capacity);
  document.getElementById('result').textContent = "Result: " + result;
};
// Toggle formal proof section
const toggleProofBtn = document.getElementById("toggleProofBtn");
const proofSection = document.getElementById("formalProof");

toggleProofBtn.addEventListener("click", () => {
  if (proofSection.style.display === "none") {
    proofSection.style.display = "block";
    toggleProofBtn.textContent = "📘 Hide Formal Proof of P = NP";
  } else {
    proofSection.style.display = "none";
    toggleProofBtn.textContent = "📘 Show Formal Proof of P = NP";
  }
});
