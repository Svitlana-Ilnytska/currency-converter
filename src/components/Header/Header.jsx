import { React } from "react";

import { ReactComponent as LogoImage } from "../../assets/vector.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import css from "./Header.module.css";

const renderKnownCurrencies = function (element, currency) {
  if (element.cc === currency) {
    return (
      <p key={element.cc} className={css.currentCurrency}>
        {element.txt} <span className={css.currentRate}>{element.rate}</span>
      </p>
    );
  } else {
    return null;
  }
};

function Header({ currencyEl }) {
  return (
    <header className={css.header}>
      <div className={css.currencyBoxes}>
        <div className={css.boxWithLogo}>
          <LogoImage className={css.logoImage} />
          <Logo className={css.logo} />
        </div>
        <div className={css.boxes}>
          <div className={css.box}>
            {currencyEl?.map((el) => renderKnownCurrencies(el, "USD"))}
          </div>
          <div className={css.box}>
            {currencyEl?.map((el) => renderKnownCurrencies(el, "EUR"))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
