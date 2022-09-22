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
      <input type="number" value={sum} onChange={(e) => handleChangeSum(e.target.value)} />
      <select value={selectCurrency} onChange={(e) => handleChangeCurrency(e.target.value)}>
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
