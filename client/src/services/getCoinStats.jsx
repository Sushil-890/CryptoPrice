// services/getCoinStats.js
export const fetchCoinStats = async () => {
  const ids = 'bitcoin,ethereum,dogecoin,solana,cardano,binancecoin';
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
};
