export const getChartColor = (prices) => {
    if (prices.length < 2) {
        return '#808080'; // Gray for insufficient data
    }

    const lastPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2];

    if (lastPrice > previousPrice) {
        return '#28a745'; // Green for price increase
    } else if (lastPrice < previousPrice) {
        return '#dc3545'; // Red for price decrease
    } else {
        return '#808080'; // Gray for no change
    }
};
