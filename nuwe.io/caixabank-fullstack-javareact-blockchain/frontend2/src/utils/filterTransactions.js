export function filterTransactions(transactions, asset) {
  if (!transactions) return [];

  const allTransactions = transactions.sent.concat(transactions.received);

  return asset ? : allTransactions;
}
