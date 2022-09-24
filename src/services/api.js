const BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange";

const today =
  new Date().getFullYear() +
  ("0" + (new Date().getMonth() + 1)).slice(-2) +
  ("0" + new Date().getDate()).slice(-2);

export function fetchCurrency() {
  return fetch(`${BASE_URL}?date=${today}&json`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

const api = {
  fetchCurrency,
};

export default api;
