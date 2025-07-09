import { solveKnapsackReflective } from './predictor.js';

window.runSolver = function () {
  const inputElement = document.getElementById('inputData');
  const resultBox = document.getElementById('result');

  if (!inputElement || !resultBox) {
    console.error("Required elements not found.");
    return;
  }

  const inputLines = inputElement.value.trim().split('\n');

  if (inputLines.length < 3) {
    resultBox.textContent = "⚠️ Invalid input. Please enter weights, values, and capacity.";
    return;
  }

  try {
    const weights = inputLines[0].split(',').map(x => parseInt(x.trim()));
    const values = inputLines[1].split(',').map(x => parseInt(x.trim()));
    const capacityLine = inputLines[2].toLowerCase().replace('capacity:', '').trim();
    const capacity = parseInt(capacityLine);

    if (weights.length !== values.length || isNaN(capacity)) {
      resultBox.textContent = "⚠️ Input mismatch or invalid capacity.";
      return;
    }

    const result = solveKnapsackReflective(weights, values, capacity);
    resultBox.innerHTML = `<span style="color:#0f0">✅ Result:</span> ${result}`;
  } catch (error) {
    resultBox.textContent = "❌ Error processing input.";
    console.error(error);
  }
};

// Toggle formal proof section
document.addEventListener("DOMContentLoaded", () => {
  const toggleProofBtn = document.getElementById("toggleProofBtn");
  const proofSection = document.getElementById("formalProof");

  if (toggleProofBtn && proofSection) {
    toggleProofBtn.addEventListener("click", () => {
      const isVisible = proofSection.style.display === "block";
      proofSection.style.display = isVisible ? "none" : "block";
      toggleProofBtn.textContent = isVisible
        ? "📘 Show Formal Proof of P = NP"
        : "📘 Hide Formal Proof of P = NP";
    });
  }
});
