export function netGroup(userId, transactions) {
  const positiveTransactions = transactions.filter(
    (transaction) => transaction.payer === userId
  );
  const negativeTransactions = transactions.filter((transaction) =>
    transaction.owerIds.includes(userId)
  );
  const totalPositive = positiveTransactions
    .map((transaction) => totalTransaction(transaction))
    .reduce((a, b) => a + b, 0);
  const totalNegative = negativeTransactions
    .map((transaction) => findOwerAmount(userId, transaction))
    .reduce((a, b) => a + b, 0);
  return totalPositive - totalNegative;
}

export function netUser(userOne, userTwo, transactions) {
  const positiveTransactions = transactions.filter(
    (transaction) => transaction.payer === userOne
  );
  const negativeTransactions = transactions.filter((transaction) =>
    transaction.owerIds.includes(userOne)
  );
  const totalPositive = positiveTransactions
    .map((transaction) => findOwerAmount(userTwo, transaction))
    .reduce((a, b) => a + b, 0);
  const totalNegative = negativeTransactions
    .map((transaction) => findOwerAmount(userOne, transaction))
    .reduce((a, b) => a + b, 0);
  return totalPositive - totalNegative;
}

export function totalTransaction(transaction) {
  return transaction.owerInfos
    .map((owerInfo) => owerInfo.amount)
    .reduce((a, b) => a + b, 0);
}

export function findOwerAmount(userId, transaction) {
  return transaction.owerInfos.find((owerInfo) => owerInfo.user.id).amount;
}
