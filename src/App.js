import { React, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import CurrencyElement from "./components/CurrencyElement/CurrencyElement";

import * as api from "./services/api";

function App() {
  const [options, setOptions] = useState([]);
  const [fromCurrencyCode, setFromCurrencyCode] = useState();
  const [toCurrencyCode, setToCurrencyCode] = useState();
  const [sum, setSum] = useState(1);
  const [sumFromCurrency, setSumFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
console.log(exchangeRate)
  const [currencyEl, setToCurrencyEl] = useState();

let toSum, fromSum;

if(sumFromCurrency) {
  fromSum = sum;
  toSum = sum * exchangeRate;
} else {
  toSum = sum;
  fromSum = sum / exchangeRate
}


  useEffect(() => {
    api.fetchCurrency().then((data) => {
      console.log(data);
      const currencyExchange = data.map((el) => el.rate);
      const currencyCodes = data.map((el) => el.cc);
      const first = currencyCodes[0];
      setOptions(["UAH", ...currencyCodes]);
      setFromCurrencyCode("UAH");
      setToCurrencyCode(first);
      setExchangeRate(currencyExchange[0]);


      const ss = data.map((el) => el);
      console.log(ss);
      setToCurrencyEl(ss);
    });
  }, []);


  useEffect(() => {

  },[toSum, fromSum])

  const handleChangeToCurrency = (e) => {
    setToCurrencyCode(e.target.value);
  };

  const handleChangeFromCurrency = (e) => {
    setFromCurrencyCode(e.target.value);
  };

  const handleFromChangeSum = (e) => {
    setSum(e.target.value)
    setSumFromCurrency(true)
  }

  const handleToChangeSum = (e) => {
    setSum(e.target.value)
    setSumFromCurrency(false)
  }

  return (
    <div>
      <Header currencyEl={currencyEl} />
      <h1>Конвертер валют</h1>
      <CurrencyElement
        options={options}
        selectCurrency={fromCurrencyCode}
        handleChangeCurrency={handleChangeFromCurrency}
        handleChangeSum={handleFromChangeSum}
        sum={fromSum}
      />
      <div>=</div>
      <CurrencyElement
        options={options}
        selectCurrency={toCurrencyCode}
        handleChangeCurrency={handleChangeToCurrency}
        handleChangeSum={handleToChangeSum}
        sum={toSum}
      />
    </div>
  );
}

export default App;
