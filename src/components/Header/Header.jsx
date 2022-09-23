import { React } from "react";

import { ReactComponent as LogoImage } from "../../assets/vector.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import css from "./Header.module.css";

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
            {currencyEl?.map(
              (el) =>
                el.cc === "USD" && (
                  <p key={el.cc} className={css.currentCurrency}>
                    {el.txt} <span className={css.currentRate}>{el.rate}</span>
                  </p>
                )
            )}
          </div>
          <div className={css.box}>
            {currencyEl?.map(
              (el) =>
                el.cc === "EUR" && (
                  <p key={el.cc} className={css.currentCurrency}>
                    {el.txt} <span className={css.currentRate}>{el.rate}</span>
                  </p>
                )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
