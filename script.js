"use strict";

// Selecting Elements
const amountElement = document.getElementById("amount");
const currencyDropdown = document.getElementById("from");
const foreignCurrencyDropdown = document.getElementById("to");
const swapBtn = document.querySelector(".exchange_swap-btn");
// Global variables

// Functions
const handleSwap = async () => {
  const temp = currencyDropdown.value;
  currencyDropdown.value = foreignCurrencyDropdown.value;
  foreignCurrencyDropdown.value = temp;
};
/*  initialization */
const dropdownInit = () => {
  foreignCurrencyDropdown.selectedIndex = 1;
};
const init = async () => {
  amountElement.value = 1;
  dropdownInit();
};
// Event listeners
swapBtn.addEventListener("click", handleSwap);
init();
