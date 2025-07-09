export function solveKnapsackReflective(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
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

  // بازسازی آیتم‌های انتخاب‌شده
  let w = capacity;
  const selectedItems = [];
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(`Item ${i}`);
      w -= weights[i - 1];
    }
  }

  return {
    maxValue: dp[n][capacity],
    selectedItems: selectedItems.reverse()
  };
}
