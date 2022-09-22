import { React } from "react";

import css from "./Header.module.css";

function Header({ currencyEl }) {
  return (
    <header className={css.currencyNav}>
      <div className={css.currencyBoxes}>
        <div className={css.box}>
          {currencyEl?.map(
            (el) =>
              el.cc === "USD" && (
                <div key={el.cc}>
                  <span >{el.txt} </span>
                  <span>{el.rate}</span>
                </div>
              )
          )}
        </div>
        <div className={css.box}>
          {currencyEl?.map(
            (el) =>
              el.cc === "EUR" && (
                <div key={el.cc}>
                  <span >{el.txt} </span> 
                  <span>{el.rate}</span>
                </div>
              )
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
