// services/historyChart.jsx
import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

function HistoryChart({ coinId }) {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`
      );
      const data = await res.json();

      const chartData = data.prices.map(([timestamp, price]) => ({
        time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: parseFloat(price.toFixed(2)),
      }));

      setHistoryData(chartData);
    };

    fetchHistory();
  }, [coinId]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 className="section-heading">📈 24-Hour Price History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historyData}>
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoryChart;
