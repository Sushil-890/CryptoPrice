export const downloadReport = () => {
  const headers = ['Coin,Price,24h Change'];
  const rows = Object.entries(coinStats).map(([id, data]) => {
    const name = id.charAt(0).toUpperCase() + id.slice(1);
    const price = data.usd.toFixed(2);
    const change = data.usd_24h_change.toFixed(2) + '%';
    return `${name},${price},${change}`;
  });

  const csvContent = [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'crypto_report.csv';
  a.click();
  URL.revokeObjectURL(url);
};
