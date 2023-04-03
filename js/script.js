"use strict";
console.log(`hi mom`);

const billInput = document.getElementById("bill");
const customTipInput = document.querySelector(".btn--custom");
const peopleInput = document.getElementById("number-people");
const tipPerson = document.querySelector(".tip-person");
const tipTotal = document.querySelector(".tip-total");
const resetBtn = document.querySelector(".btn--reset");

let billAmount = 0;
let customTip = 0;
let numOfPeople = 1;

// Obsługa wprowadzania rachunku
billInput.addEventListener("input", (event) => {
	billAmount = parseFloat(event.target.value);
	calculateTip();
});

// Obsługa wprowadzania procentowego napiwku
document.querySelectorAll(".btn").forEach((btn) => {
	btn.addEventListener("click", (event) => {
		// Dodaj klasę btn--clicked do klikniętego przycisku
		event.target.classList.add("btn--clicked");

		// Usuń klasę btn--clicked z pozostałych przycisków .btn
		document.querySelectorAll(".btn").forEach((otherBtn) => {
			if (otherBtn !== event.target) {
				otherBtn.classList.remove("btn--clicked");
			}
		});

		customTipInput.value = "";
		customTip = parseFloat(event.target.textContent);
		calculateTip();
	});
});

// Obsługa wprowadzania niestandardowego napiwku
customTipInput.addEventListener("input", (event) => {
	customTip = parseFloat(event.target.value);
	calculateTip();
});

// Obsługa wprowadzania liczby osób
peopleInput.addEventListener("input", (event) => {
	numOfPeople = parseFloat(event.target.value);
	calculateTip();
});

// Funkcja obliczająca napiwek i wyświetlająca wyniki
function calculateTip() {
	if (billAmount && numOfPeople) {
		const tipAmount = (billAmount * customTip) / 100;
		const totalAmount = billAmount + tipAmount;
		const tipPerPerson = tipAmount / numOfPeople;
		const totalPerPerson = totalAmount / numOfPeople;

		tipPerson.textContent = `$${tipPerPerson.toFixed(2)}`;
		tipTotal.textContent = `$${totalPerPerson.toFixed(2)}`;
	}

	// Sprawdzenie, czy należy aktywować przycisk reset
	if (billAmount || customTip || numOfPeople) {
		resetBtn.classList.add("btn--reset-active");
		resetBtn.classList.remove("btn--reset-inactive");
	} else {
		resetBtn.classList.remove("btn--reset-active");
		resetBtn.classList.add("btn--reset-inactive");
	}
}

// Obsługa przycisku reset
resetBtn.addEventListener("click", () => {
	billInput.value = "";
	customTipInput.value = "";
	peopleInput.value = "";
	tipPerson.textContent = "$0.00";
	tipTotal.textContent = "$0.00";
	resetBtn.classList.add("btn--reset-inactive");
	resetBtn.classList.remove("btn--reset-active");

	document.querySelectorAll(".btn").forEach((otherBtn) => {
		if (otherBtn !== event.target) {
			otherBtn.classList.remove("btn--clicked");
		}
	});
});
