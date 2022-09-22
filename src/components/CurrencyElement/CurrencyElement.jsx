import { React } from "react";

function CurrencyElement({
  options,
  selectCurrency,
  handleChangeCurrency,
  sum,
  handleChangeSum,
}) {
  return (
    <div>
      <input type="nuber" value={sum} onChange={handleChangeSum} />
      <select value={selectCurrency} onChange={handleChangeCurrency}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyElement;
