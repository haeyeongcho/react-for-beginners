import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amountUSD, setAmountUSD] = useState("");
  const [btcPrice, setBtcPrice] = useState(0);
  const [howMuchBTC, setHowMuchBTC] = useState(0);
  const onChange = (event) => {
    const value = event.target.value;
    setAmountUSD(value);
    setHowMuchBTC(value / 68412);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers").then((response) =>
      response.json().then((json) => {
        setCoins(json);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
    );
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <input
            value={amountUSD}
            type="number"
            onChange={onChange}
            placeholder="Enter amount in USD"
          ></input>
          <div>{howMuchBTC} BTC</div>
          <select>
            {coins.map((coin) => (
              <option>
                {coin.name} ({coin.symbol}: ${coin.quotes.USD.price} USD)
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export default App;
