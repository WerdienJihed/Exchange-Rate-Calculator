"use strict";

// Selecting Elements
const amountElement = document.getElementById("amount");
const currencyDropdown = document.getElementById("from");
const foreignCurrencyDropdown = document.getElementById("to");
const resultElement = document.querySelector(".result");
const swapBtn = document.querySelector(".exchange_swap-btn");
// Global variables

// Functions
const handleSwap = async () => {
  const temp = currencyDropdown.value;
  currencyDropdown.value = foreignCurrencyDropdown.value;
  foreignCurrencyDropdown.value = temp;
  calculateResult();
};

const handleAmountChanged = async (e) => {
  if (
    e.target.value === "" ||
    isNaN(e.target.value) ||
    Number(e.target.value) < 0
  )
    amountElement.value = 0;

  calculateResult();
};

const calculateResult = async () => {
  let result = 0;
  const currency = currencyDropdown.value;
  const foreignCurrency = foreignCurrencyDropdown.value;
  if (Number(amountElement.value) > 0) {
    result = await fetchConvertApi(
      amountElement.value,
      currency,
      foreignCurrency
    );
  }
  resultElement.textContent = `${amountElement.value} ${currency} = ${result} ${foreignCurrency}`;
};
// data fetching
const fetchConvertApi = async (amount, currency, foreignCurrency) => {
  if (currency === foreignCurrency) return amount;
  const resp = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=${foreignCurrency}`
  );

  const data = await resp.json();
  return data.rates[foreignCurrency];
};

const fetchCurrenciesApi = async () => {
  const resp = await fetch("https://api.frankfurter.app/currencies");
  const data = await resp.json();
  return Object.entries(data);
};
//  initialization
const dropdownInit = (currencies) => {
  currencies.forEach((element) => {
    currencyDropdown.add(new Option(element[1], element[0]));
    foreignCurrencyDropdown.add(new Option(element[1], element[0]));
  });
  foreignCurrencyDropdown.selectedIndex = 1;
};

const init = async () => {
  amountElement.value = 1;
  const supportedCurrencies = await fetchCurrenciesApi();
  dropdownInit(supportedCurrencies);
  calculateResult();
};

// Event listeners
swapBtn.addEventListener("click", handleSwap);
amountElement.addEventListener("input", handleAmountChanged);
currencyDropdown.addEventListener("change", calculateResult);
foreignCurrencyDropdown.addEventListener("change", calculateResult);
// App
init();
