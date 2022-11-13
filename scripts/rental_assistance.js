document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.getElementById("submit").onclick = function () {
      calculate();
    };
  },
  false
);

function calculate() {
  let age_element = document.querySelector('input[name="age"]:checked');
  let race_element = document.querySelector('input[name="race"]:checked');
  let dependents_element = document.querySelector(
    'input[name="dependents"]:checked'
  );
  let property_element = document.querySelector(
    'input[name="property"]:checked'
  );
  let income_element = document.querySelector('input[name="income"]:checked');
  let education_element = document.querySelector(
    'input[name="education"]:checked'
  );
  let inheritance_element = document.querySelector(
    'input[name="inheritance"]:checked'
  );

  let inputs = [
    age_element,
    race_element,
    dependents_element,
    property_element,
    income_element,
    education_element,
    inheritance_element,
  ];

  if (
    inputs.some(function (el) {
      return el === null || el === "";
    })
  ) {
    alert("Please answer all the questions");
    return;
  }

  let income_selection = income_element.value;

  // let savings_selection = savings_element.value;

  let dependents_selection = dependents_element.value;

  let inheritance_selection = inheritance_element.value;

  let race_selection = race_element.value;

  let income = calculate_income(income_selection);

  let income_qualifier = calculate_income_qualifier(income_selection);

  // let savings_qualifier = calculate_savings_qualifier(savings_selection);

  let wealth_qualifier = calculate_wealth_qualifier(
    inheritance_selection,
    race_selection
  );

  let dependent_qualifier = calculate_dependent_qualifier(dependents_selection);

  let income_chunk = income * income_qualifier;

  // let savings_chunk = savings * savings_qualifier;

  // let donation =
  //   dependent_qualifier * wealth_qualifier * (income_chunk + savings_chunk);

  let donation = dependent_qualifier * wealth_qualifier * income_chunk;

  display_donation(Math.round(donation));
}

function display_donation(donation) {
  let donation_annual = document.getElementById("annual-donation");
  donation_annual.innerHTML = "Suggested annual donation: $" + donation;
  let donation_monthly = document.getElementById("monthly-donation");
  donation_monthly.innerHTML =
    "Suggested monthly donation: $" + Math.round(donation / 12);
}

function calculate_income(income_selection) {
  let income_qualifier_hash = {
    "<$50,000": 25000,
    "$50,000 - $100,000": 75000,
    "$100,000 - $150,000": 125000,
    "$150,000+": 200000,
  };

  return income_qualifier_hash[income_selection];
}

function calculate_income_qualifier(income_selection) {
  let income_qualifier_hash = {
    "<$50,000": 0.01,
    "$50,000 - $100,000": 0.0125,
    "$100,000 - $150,000": 0.015,
    "$150,000+": 0.02,
  };

  return income_qualifier_hash[income_selection];
}

function calculate_savings_qualifier(savings_selection) {
  let savings_qualifier_hash = {
    "<$50,000": 0.01,
    "$50,000 - $100,000": 0.0125,
    "$100,000 - $150,000": 0.015,
    "$150,000+": 0.02,
  };

  return savings_qualifier_hash[savings_selection];
}

function calculate_wealth_qualifier(inheritance_selection, race_selection) {
  let inheritance_qualifier_hash = {
    "No, I (will) have to support my family or inherit their debt": 0.8,
    "No, I will neither inherit assets nor debt": 1,
    "Yes, under $100,000": 1.3,
    "Yes, between $100,000 and  $500,000": 1.5,
    "Yes, between $500,000 and 1 million": 1.7,
    "Yes, more than 1 million": 2,
  };

  let race_qualifier_hash = {
    White: 1.5,
    "Non-white, non-native": 0.8,
    "Native or Indigenous": 0.5,
  };

  let total =
    inheritance_qualifier_hash[inheritance_selection] *
    race_qualifier_hash[race_selection];

  return total;
}

function calculate_dependent_qualifier(dependents_selection) {
  let dependents_qualifier_hash = {
    0: 1,
    1: 0.8,
    2: 0.7,
    3: 0.6,
    "4+": 0.5,
  };

  return dependents_qualifier_hash[dependents_selection];
}
