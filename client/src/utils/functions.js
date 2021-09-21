export function netGroup(userId, transactions) {
  const positiveTransactions = transactions.filter(
    (transaction) => transaction.payer.id === userId && transaction.type !== 'payment'
  );
  console.log(positiveTransactions);
  const negativeTransactions = transactions.filter((transaction) =>
    transaction.owerIds.includes(userId) && transaction.type !== 'payment'
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
  console.log('user1', userOne);
  console.log('user2', userTwo);
  const positiveTransactions = transactions.filter(
    (transaction) =>
      transaction.payer.id === userOne && transaction.type !== 'payment'
  ); // money you are owed (will recieve) from user2
  const negativeTransactionsPayment = transactions.filter(
    (transaction) =>
      transaction.payer.id === userOne && transaction.type === 'payment'
  ); // money user2 has sent you (paid off)
  const negativeTransactions = transactions.filter(
    (transaction) =>
      transaction.owerIds.includes(userOne) && transaction.type !== 'payment'
  ); // money you owe user2

  const positiveTransactionsPayment = transactions.filter(
    (transaction) =>
      transaction.owerIds.includes(userOne) && transaction.type === 'payment'
  ); // money you have paid to user2

  console.log('positiveTransactions', positiveTransactions);
  console.log('negativeTransactions', negativeTransactions);
  console.log('positivePayments', positiveTransactionsPayment);
  console.log('negativePayments', negativeTransactionsPayment);
  const totalPositive =
    positiveTransactions
      .map((transaction) => findOwerAmount(userTwo, transaction))
      .reduce((a, b) => a + b, 0) +
    positiveTransactionsPayment
      .map((transaction) => findOwerAmount(userOne, transaction))
      .reduce((a, b) => a + b, 0);
  const totalNegative =
    negativeTransactions
      .map((transaction) => findOwerAmount(userOne, transaction))
      .reduce((a, b) => a + b, 0) +
    negativeTransactionsPayment
      .map((transaction) => findOwerAmount(userTwo, transaction))
      .reduce((a, b) => a + b, 0);
  return totalPositive - totalNegative;
}

export function totalTransaction(transaction) {
  return transaction.owerInfos
    .map((owerInfo) => owerInfo.amount)
    .reduce((a, b) => a + b, 0);
}

export function findOwerAmount(userId, transaction) {
  console.log('userId', userId);
  console.log('transaction', transaction);
  return (transaction.owerInfos.find((owerInfo) => owerInfo.user.id === userId)
    ? transaction.owerInfos.find((owerInfo) => owerInfo.user.id === userId)
      .amount
    : 0);
}
