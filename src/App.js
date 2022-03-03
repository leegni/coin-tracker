import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState("");
  const [btc, setBtc] =  useState("");
 
  const onChange = (event) => setUsd(event.target.value);
  const onSelect = (event) => setBtc(event.target.value);
  
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  },[]);
  
  return (
   
    <div >
      <h1>The Coins! {loading ? "" : coins.length}</h1>
      {loading ? (<strong>Loading...</strong>) : (
        <select onChange={onSelect}>
          <option>Select BTC</option>
          {coins.map((coin)=> (
          <option key={coin.id} value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
          </option>
          ))}
        </select>
      )
      }
      <br/>
      <input type="text" value={usd==="" ? 0 : usd} onChange={onChange} placeholder="HOW MUCH?" pattern="^[0-9]+$"/>
      
      <h2>{usd===""||btc===""?0:usd/btc}</h2>
    </div>
    

  );
}

export default App;
