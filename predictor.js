function predictRPMFeasibility(problemType, inputData) {
  let score = 0;
  let explanation = [];

  if (problemType === 'knapsack') {
    const { items, capacity, targetValue } = inputData;
    const totalValue = items.reduce((sum, i) => sum + i.value, 0);
    if (totalValue < targetValue) {
      score -= 40;
      explanation.push("Total value < target value");
    } else {
      score += 30;
      explanation.push("Value can reach target");
    }
  }
  const probability = Math.min(Math.max((score + 50) / 100, 0), 1);
  return { probability, explanation };
}
window.predictRPMFeasibility = predictRPMFeasibility;