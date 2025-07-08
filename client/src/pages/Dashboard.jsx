import { useEffect, useState, useRef } from 'react';
import { connectToBinance } from '../services/binance';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import HistoryChart from '../services/HistoryChart';
import { fetchCoinStats } from '../services/getCoinStats';

const coinIdMap = {
  btcusdt: 'bitcoin',
  ethusdt: 'ethereum',
  dogeusdt: 'dogecoin',
  solusdt: 'solana',
  adausdt: 'cardano',
  bnbusdt: 'binancecoin',
};

const coinSymbols = {
  btcusdt: 'Bitcoin',
  ethusdt: 'Ethereum',
  dogeusdt: 'Dogecoin',
  solusdt: 'Solana',
  adausdt: 'Cardano',
  bnbusdt: 'BNB',
};

function Dashboard() {
  const [prices, setPrices] = useState({});
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinHistory, setCoinHistory] = useState({});
  const [coinStats, setCoinStats] = useState({});
  const lastUpdateRef = useRef({});

  useEffect(() => {
    fetchCoinStats().then(setCoinStats);
  }, []);

  useEffect(() => {
    const socket = connectToBinance((data) => {
      setPrices((prev) => ({ ...prev, ...data }));
      const now = Date.now();

      Object.keys(data).forEach((symbol) => {
        if (!lastUpdateRef.current[symbol] || now - lastUpdateRef.current[symbol] >= 2000) {
          lastUpdateRef.current[symbol] = now;

          setCoinHistory((prev) => {
            const history = prev[symbol] || [];
            const updated = [
              ...history,
              {
                time: new Date().toLocaleTimeString(),
                price: parseFloat(data[symbol]),
              },
            ];
            return {
              ...prev,
              [symbol]: updated.slice(-30),
            };
          });
        }
      });
    });

    return () => socket.close();
  }, []);

  const downloadReport = () => {
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

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">CryptoPulse Dashboard</h1>

      <h2 className="section-heading">Live Prices:</h2>
      <ul className="coin-list">
        {Object.entries(prices).map(([coin, price]) => (
          <li
            key={coin}
            className={`coin-item ${selectedCoin === coin ? 'active' : ''}`}
            onClick={() => setSelectedCoin(coin)}
          >
            {coinSymbols[coin] || coin.toUpperCase()}: ${parseFloat(price).toFixed(2)}
          </li>
        ))}
      </ul>

      {selectedCoin && (
        <>
          <div className="chart-section">
            <h2 className="section-heading">
              {coinSymbols[selectedCoin] || selectedCoin.toUpperCase()} Live Chart
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={coinHistory[selectedCoin] || []}>
                <XAxis dataKey="time" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <h2 className="section-heading">
            24h Price Change:
            <button onClick={downloadReport} className="download-button">
              📥 Download Report
            </button>
          </h2>

          <ul className="coin-list">
            {Object.entries(coinStats).map(([id, stats]) => (
              <li key={id} className="coin-item">
                {id.charAt(0).toUpperCase() + id.slice(1)}: ${stats.usd.toFixed(2)} | 24h:
                <span style={{ color: stats.usd_24h_change >= 0 ? 'green' : 'red' }}>
                  {stats.usd_24h_change.toFixed(2)}%
                  {stats.usd_24h_change >= 0 ? ' 📈 (Profit)' : ' 📉 (Loss)'}
                </span>
              </li>
            ))}
          </ul>

          <HistoryChart coinId={coinIdMap[selectedCoin]} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
