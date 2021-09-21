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
      (transaction) => transaction.payer === userOne && transaction.type !== 'payment'
    ); // money you are owed (will recieve) from user2
    const negativeTransactionsPayment = transactions.filter(
        (transaction) => transaction.payer === userOne && transaction.type === 'payment'
      ); // money user2 has sent you (paid off)
    const negativeTransactions = transactions.filter((transaction) =>
      transaction.owerIds.includes(userOne) && transaction.type !== 'payment'
    ); // money you owe user2

    const positiveTransactionsPayment = transactions.filter((transaction) =>
    transaction.owerIds.includes(userOne) && transaction.type === 'payment'
  ); // money you have paid to user2
    const totalPositive = positiveTransactions
      .map((transaction) => findOwerAmount(userTwo, transaction))
      .reduce((a, b) => a + b, 0) + positiveTransactionsPayment.map((transaction) => findOwerAmount(userTwo, transaction))
      .reduce((a, b) => a + b, 0);
    const totalNegative = negativeTransactions
      .map((transaction) => findOwerAmount(userOne, transaction))
      .reduce((a, b) => a + b, 0) + negativeTransactionsPayment
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
    return transaction.owerInfos.find((owerInfo) => owerInfo.user.id === userId).amount;
  }