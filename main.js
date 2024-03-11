const tipOptions = document.querySelectorAll(".tip-option");
const btn = document.querySelector(".btn");
const customTipInput = document.getElementById("custom");
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipAmountDisplay = document.querySelector("#tip-amount");
const totalTipAmountDisplay = document.querySelector("#total-tip-amount");

// Calculate and update tip amount
function updateTipAmount(bill, people, tipPercentage) {
  const tip = (tipPercentage + 100) / 100;
  const totalPerPerson = (tip * bill) / people;
  const totalPerPersonRounded = Math.round(totalPerPerson * 100) / 100;
  const billPerPerson = Math.round((bill / people) * 100) / 100;
  const individualContribution =
    Math.round((totalPerPersonRounded - billPerPerson) * 100) / 100;

  tipAmountDisplay.innerHTML = individualContribution;
  totalTipAmountDisplay.innerHTML = totalPerPersonRounded;
}

const percentages = tipOptions.forEach((child) => {
  child.addEventListener("click", () => {
    let bill = parseFloat(billInput.value);
    let people = parseFloat(peopleInput.value);
    let tipPercentage = parseInt(
      child.lastElementChild.getAttribute("data-percentage"),
      10
    );

    if (!isNaN(bill) && bill > 0 && !isNaN(people) && people > 0) {
      updateTipAmount(bill, people, tipPercentage);
    }
  });
});

customTipInput.addEventListener("keyup", getInputValue);

function getInputValue() {
  let bill = parseFloat(billInput.value);
  let people = parseFloat(peopleInput.value);
  let customTipPercentage = parseFloat(customTipInput.value);

  if (!isNaN(customTipPercentage) && customTipPercentage >= 0) {
    updateTipAmount(bill, people, customTipPercentage);
  }
}

btn.addEventListener("click", () => {
  bill.value = "";
  people.value = "";
  document.querySelector("#tip-amount").innerHTML = "0.00";
  document.querySelector("#total-tip-amount").innerHTML = "0.00";
});
