import { React, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import CurrencyElement from "./components/CurrencyElement/CurrencyElement";
import { ReactComponent as Arrows } from "./assets/arrows.svg";

import * as api from "./services/api";
import css from "./App.module.css";

function App() {
  const [options, setOptions] = useState([]);
  const [rates, setRates] = useState([]);
  const [fromCurrencyCode, setFromCurrencyCode] = useState("");
  const [toCurrencyCode, setToCurrencyCode] = useState("");
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
      (
        (fromCurrencyCode * rates[currentFromCurrency]) /
        rates[currentToCurrency]
      ).toFixed(4)
    );
    setFromCurrencyCode(fromCurrencyCode);
  };

  const handleChangeFromCurrency = (currentFromCurrency) => {
    setToCurrencyCode(
      (
        (fromCurrencyCode * rates[currentFromCurrency]) /
        rates[currentToCurrency]
      ).toFixed(4)
    );
    setFromCurrentCurrency(currentFromCurrency);
  };

  const handleToChangeSum = (toCurrencyCode) => {
    setFromCurrencyCode(
      (
        (toCurrencyCode * rates[currentToCurrency]) /
        rates[currentFromCurrency]
      ).toFixed(4)
    );
    setToCurrencyCode(toCurrencyCode);
  };

  const handleChangeToCurrency = (currentToCurrency) => {
    setFromCurrencyCode(
      (
        (toCurrencyCode * rates[currentToCurrency]) /
        rates[currentFromCurrency]
      ).toFixed(4)
    );
    setToCurrentCurrency(currentToCurrency);
  };

  return (
    <div>
      <Header currencyEl={currencyEl} />
      <div className={css.main}>
        <h1 className={css.title}>Конвертер валют</h1>
        <div className={css.boxes}>
          <CurrencyElement
            options={options}
            selectCurrency={currentFromCurrency}
            handleChangeCurrency={handleChangeFromCurrency}
            handleChangeSum={handleFromChangeSum}
            sum={fromCurrencyCode}
          />
          <div className={css.arrows}>
            <Arrows className={css.svg} />
          </div>
          <CurrencyElement
            options={options}
            selectCurrency={currentToCurrency}
            handleChangeCurrency={handleChangeToCurrency}
            handleChangeSum={handleToChangeSum}
            sum={toCurrencyCode}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
