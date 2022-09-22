const BASE_URL =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

export function fetchCurrency() {
  return fetch(BASE_URL).then((response) => {
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
