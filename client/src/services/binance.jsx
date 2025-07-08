export const connectToBinance = (onMessage) => {
  const socket = new WebSocket(
    'wss://stream.binance.com:9443/stream?streams=btcusdt@miniTicker/ethusdt@miniTicker/dogeusdt@miniTicker/solusdt@miniTicker/adausdt@miniTicker/bnbusdt@miniTicker'
  );

  socket.onmessage = (msg) => {
    const { data } = JSON.parse(msg.data);
    const coin = data.s.toLowerCase(); // btcusdt, ethusdt etc.
    const price = data.c;
    onMessage({ [coin]: price });
  };

  socket.onerror = (err) => {
    console.error('WebSocket Error:', err);
  };

  return socket;
};
