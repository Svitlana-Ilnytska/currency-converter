import { React, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import CurrencyElement from "./components/CurrencyElement/CurrencyElement";

import * as api from "./services/api";

function App() {
  const [options, setOptions] = useState([]);
  const [rates, setRates] = useState([]);
  const [fromCurrencyCode, setFromCurrencyCode] = useState(1);
  const [toCurrencyCode, setToCurrencyCode] = useState();
  const [currentFromCurrency, setFromCurrentCurrency] = useState("UAH");
  const [currentToCurrency, setToCurrentCurrency] = useState();

  const [currencyEl, setToCurrencyEl] = useState();


  useEffect(() => {
    api.fetchCurrency().then((data) => {
      const currencyExchange = data.map((el) => el.rate);
      const currencyCodes = data.map((el) => el.cc);

      const newObjWithRates = {};
      for (var i = 0; i < currencyCodes.length; i++) {
        newObjWithRates[currencyCodes[i]] = currencyExchange[i];
        newObjWithRates["UAH"] = 1.0;
      }
      console.log(newObjWithRates);
      setRates(newObjWithRates);

      const first = currencyCodes[0];
      setOptions([...Object.keys(newObjWithRates)]);

      setToCurrentCurrency(first);

      const separateElement = data.map((el) => el);
      setToCurrencyEl(separateElement);
    });
  }, []);

  const handleFromChangeSum = (fromCurrencyCode) => {
    setToCurrencyCode(
      (fromCurrencyCode * rates[currentFromCurrency]) / rates[currentToCurrency]
    );
    setFromCurrencyCode(fromCurrencyCode);
  };

  const handleChangeFromCurrency = (currentFromCurrency) => {
    setToCurrencyCode(
      (fromCurrencyCode * rates[currentToCurrency]) / rates[currentFromCurrency]
    );
    setFromCurrentCurrency(currentFromCurrency);
  };

  const handleToChangeSum = (toCurrencyCode) => {
    setFromCurrencyCode(
      (toCurrencyCode * rates[currentFromCurrency]) / rates[currentToCurrency]
    );
    setToCurrencyCode(toCurrencyCode);
  };

  const handleChangeToCurrency = (currentToCurrency) => {
    setFromCurrencyCode(
      (toCurrencyCode * rates[currentFromCurrency]) / rates[currentToCurrency]
    );
    setToCurrentCurrency(currentToCurrency);
  };

  return (
    <div>
      <Header currencyEl={currencyEl} />
      <h1>Конвертер валют</h1>
      <CurrencyElement
        options={options}
        selectCurrency={currentFromCurrency}
        handleChangeCurrency={handleChangeFromCurrency}
        handleChangeSum={handleFromChangeSum}
        sum={fromCurrencyCode}
      />
      <div>=</div>
      <CurrencyElement
        options={options}
        selectCurrency={currentToCurrency}
        handleChangeCurrency={handleChangeToCurrency}
        handleChangeSum={handleToChangeSum}
        sum={toCurrencyCode}
      />
    </div>
  );
}

export default App;
