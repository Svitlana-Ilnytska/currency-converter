import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import CurrencyElement from "./components/CurrencyElement/CurrencyElement";
import { ReactComponent as Arrows } from "./assets/arrows.svg";

import { useGetCurrencyByDateQuery } from "./redux/currencyExchanger";
import css from "./App.module.css";

const obj = { txt: "Українська гривня", cc: "UAH", rate: 1 };

const today =
  new Date().getFullYear() +
  ("0" + (new Date().getMonth() + 1)).slice(-2) +
  ("0" + new Date().getDate()).slice(-2);

function App() {
  const { data } = useGetCurrencyByDateQuery(today);

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
    if (data !== undefined) {
      setToCurrencyEl([obj, ...data]);
    }
  }, [data]);

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

  const calculationChangeSum = (
    code,
    firstCurrentCurrency,
    secondCurrentCurrency
  ) => {
    return (
      (code * rates[firstCurrentCurrency]) /
      rates[secondCurrentCurrency]
    ).toFixed(4);
  };

  const handleFromChangeSum = (fromCurrencyCode) => {
    setToCurrencyCode(
      calculationChangeSum(
        fromCurrencyCode,
        currentFromCurrency,
        currentToCurrency
      )
    );
    setFromCurrencyCode(fromCurrencyCode);
  };

  const handleChangeFromCurrency = (currentFromCurrency) => {
    setFromCurrentCurrencyName(filteredCurrentCurrency(currentFromCurrency));
    setToCurrencyCode(
      calculationChangeSum(
        fromCurrencyCode,
        currentFromCurrency,
        currentToCurrency
      )
    );
    setFromCurrentCurrency(currentFromCurrency);
  };

  const handleToChangeSum = (toCurrencyCode) => {
    setFromCurrencyCode(
      calculationChangeSum(
        toCurrencyCode,
        currentToCurrency,
        currentFromCurrency
      )
    );
    setToCurrencyCode(toCurrencyCode);
  };

  const handleChangeToCurrency = (currentToCurrency) => {
    setToCurrentCurrencyName(filteredCurrentCurrency(currentToCurrency));
    setFromCurrencyCode(
      calculationChangeSum(
        toCurrencyCode,
        currentToCurrency,
        currentFromCurrency
      )
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
