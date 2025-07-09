function analyzePerformance(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );
  let steps = 0;

  const startTime = performance.now();

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      steps++;
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  const result = dp[n][capacity];

  let complexityNote = "";

  if (steps <= n * capacity && executionTime < 5000) {
    complexityNote = "✅ Executed in polynomial time.";
  } else {
    complexityNote = "⚠️ Possibly exponential time.";
  }

  const analysisDiv = document.getElementById("analysis");
  analysisDiv.innerHTML = `
    <p><strong>Items (n):</strong> ${n}</p>
    <p><strong>Steps:</strong> ${steps}</p>
    <p><strong>Execution Time:</strong> ${executionTime.toFixed(2)} ms</p>
    <p><strong>Result:</strong> ${result}</p>
    <p><strong>Analysis:</strong> ${complexityNote}</p>
  `;

  return result;
}

window.analyzePerformance = analyzePerformance;
