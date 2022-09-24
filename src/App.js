import { React, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import CurrencyElement from "./components/CurrencyElement/CurrencyElement";
import { ReactComponent as Arrows } from "./assets/arrows.svg";

import * as api from "./services/api";
import css from "./App.module.css";

const obj = { txt: "Українська гривня", cc: "UAH", rate: 1 };

function App() {
  const [rates, setRates] = useState([]);
  const [currencyEl, setToCurrencyEl] = useState();
  const [fromCurrencyCode, setFromCurrencyCode] = useState("");
  const [toCurrencyCode, setToCurrencyCode] = useState("");
  const [currentFromCurrency, setFromCurrentCurrency] = useState("UAH");
  const [currentFromCurrencyName, setFromCurrentCurrencyName] =
    useState("Українська гривня");
  const [currentToCurrency, setToCurrentCurrency] = useState("USD");
  const [currentToCurrencyName, setToCurrentCurrencyName] =
    useState("Долар США");

  useEffect(() => {
    api
      .fetchCurrency()
      .then((data) => {
        setToCurrencyEl([obj, ...data]);
      })
      .catch((error) => {
        console.log("Trouble. Something is wrong :(", error);
      });
  }, []);

  useEffect(() => {
    const currencyExchange = currencyEl?.map((el) => el.rate);
    const currencyCodes = currencyEl?.map((el) => el.cc);

    const newObjWithRates = {};
    for (let i = 0; i < currencyCodes?.length; i++) {
      newObjWithRates[currencyCodes[i]] = currencyExchange[i];
    }
    setRates(newObjWithRates);
  }, [currencyEl]);

  const filteredCurrentCurrency = (code) => {
    const currency = currencyEl.filter((currency) => currency.cc === code);
    return currency[0].txt;
  };

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
    setFromCurrentCurrencyName(filteredCurrentCurrency(currentFromCurrency));
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
    setToCurrentCurrencyName(filteredCurrentCurrency(currentToCurrency));
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
            currentCurrencyName={currentFromCurrencyName}
            options={currencyEl}
            selectCurrency={currentFromCurrency}
            handleChangeCurrency={handleChangeFromCurrency}
            handleChangeSum={handleFromChangeSum}
            sum={fromCurrencyCode}
          />
          <div className={css.arrows}>
            <Arrows className={css.svg} />
          </div>
          <CurrencyElement
            currentCurrencyName={currentToCurrencyName}
            options={currencyEl}
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
