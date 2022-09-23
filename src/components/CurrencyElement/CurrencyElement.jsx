import { React } from "react";

import css from "./CurrencyElement.module.css";

function CurrencyElement({
  options,
  selectCurrency,
  handleChangeCurrency,
  sum,
  handleChangeSum,
}) {
  return (
    <div className={css.box}>
      <select
        className={css.select}
        value={selectCurrency}
        onChange={(e) => handleChangeCurrency(e.target.value)}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        className={css.input}
        type="number"
        value={sum}
        onChange={(e) => handleChangeSum(e.target.value)}
      />
    </div>
  );
}

export default CurrencyElement;
