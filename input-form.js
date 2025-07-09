document.getElementById("problem").addEventListener("change", renderForm);
document.getElementById("runRPM").addEventListener("click", runNovaRPM);
function renderForm() {
  const selected = document.getElementById("problem").value;
  const inputArea = document.getElementById("input-area");
  if (selected === "knapsack") {
    inputArea.innerHTML = '<label>Capacity:</label><input type="number" id="capacity" value="5" /><br><label>Target Value:</label><input type="number" id="targetValue" value="6" /><br><textarea id="itemList">A,3,4\nB,2,2</textarea>';
  }
}
function runNovaRPM() {
  const selected = document.getElementById("problem").value;
  const capacity = parseInt(document.getElementById("capacity").value);
  const targetValue = parseInt(document.getElementById("targetValue").value);
  const rawItems = document.getElementById("itemList").value.trim().split("\n");
  const items = rawItems.map(line => {
    const [name, weight, value] = line.split(",");
    return { name: name.trim(), weight: +weight, value: +value };
  });
  const inputData = { items, capacity, targetValue };
  const prediction = predictRPMFeasibility(selected, inputData);
  document.getElementById("analysis").innerText = `Predicted Feasibility: ${(prediction.probability * 100).toFixed(1)}%\n${prediction.explanation.join("\n")}`;
  const result = new NovaRPM(selected, inputData).run();
  document.getElementById("analysis").innerText += `\n\nResults:\n` + result.map(r => `✔ ${r.subset.join('+')}`).join("\n");
}