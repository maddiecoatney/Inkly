// INKLY ORDER SCRIPT
// JAVASCRIPT REQUIREMENTS USED AND LABELED BELOW:

//Variables
//Arithmetic Operators
//Loops
//If and Else
//Arrays
//Event Listener
//Let
//Constant
//Boolean
//String Methods
//Try/Catch

//CONSTANT PRICE
const BASE_PRICE = 20;

//VARIABLES TO ACCESS PAGE ELEMENTS
let orderForm = document.getElementById("orderForm");
let summarySection = document.getElementById("orderSummary");
let summaryContent = document.getElementById("summaryContent");
let resetBtn = document.getElementById("resetBtn");

//EVENT LISTENER
orderForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stops page reload

  //Validate input first
  let formIsValid = validateForm(); //Boolean
  if (formIsValid === false) {
    return;
  }

  //GET VALUES FROM INPUTS
  let firstName = document.getElementById("firstName").value.trim(); // String Methods
  let lastName = document.getElementById("lastName").value.trim();
  let companyName = document.getElementById("companyName").value.trim();
  let email = document.getElementById("email").value.trim();
  let quantity = Number(document.getElementById("quantity").value);
  let deliveryDate = document.getElementById("deliveryDate").value;
  let notes = document.getElementById("notes").value.trim();

  //GET SELECTED COLORS
  let checkedColors = document.querySelectorAll('input[name="color"]:checked');
  let colorPrices = []; // Arrays
  let colorLabels = []; //Arrays

  //Loop through each selected checkbox
  for (let i = 0; i < checkedColors.length; i++) {
    // Loops
    let box = checkedColors[i];

    //Price value
    colorPrices.push(Number(box.value));

    //Label text
    let labelText = box.parentNode.textContent.trim(); // String Methods
    colorLabels.push(labelText);
  }

  //GET SELECTED SIZE
  let chosenSize = document.querySelector('input[name="size"]:checked');
  let sizeLabel = chosenSize.parentNode.textContent.trim();
  let sizeExtra = Number(chosenSize.value);

  //CALCULATE TOTAL COST
  let totalCost = calculateTotal(colorPrices, sizeExtra, quantity);

  //CREATE ORDER SUMMARY TEXT
  let html = "";

  html =
    html + "<p><strong>Name:</strong> " + firstName + " " + lastName + "</p>";
  html = html + "<p><strong>Email:</strong> " + email + "</p>";
  html =
    html + "<p><strong>Colors:</strong> " + colorLabels.join(", ") + "</p>"; //Arrays with join
  html = html + "<p><strong>Size:</strong> " + sizeLabel + "</p>";
  html = html + "<p><strong>Quantity:</strong> " + quantity + "</p>";
  html =
    html +
    "<p><strong>Delivery Date:</strong> " +
    formatDate(deliveryDate) +
    "</p>";
  html =
    html + "<p><strong>Total Price:</strong> $" + totalCost.toFixed(2) + "</p>"; //Arithmetic Operators

  //Only show company if entered
  if (companyName !== "") {
    // If and Else
    html = html + "<p><strong>Company:</strong> " + companyName + "</p>";
  }

  //Only show notes if entered
  if (notes !== "") {
    html = html + "<p><strong>Notes:</strong> " + notes + "</p>";
  }

  //Display summary on page
  summaryContent.innerHTML = html;

  //Show section
  summarySection.classList.remove("hidden");
});

//EVENT LISTENER / RESET BUTTON
resetBtn.addEventListener("click", function () {
  //Event Listener
  summarySection.classList.add("hidden");
  summaryContent.innerHTML = "";
});

//FUNCTION: CALCULATE TOTAL PRICE
function calculateTotal(colorArray, sizePrice, quantity) {
  let totalPerShirt = 0; // Let

  //Add each color price
  for (let i = 0; i < colorArray.length; i++) {
    //Loops
    totalPerShirt = totalPerShirt + colorArray[i]; //Arithmetic Operators
  }

  //If no colors selected
  if (totalPerShirt === 0) {
    // If and Else
    totalPerShirt = BASE_PRICE;
  }

  //Add size upcharge
  totalPerShirt = totalPerShirt + sizePrice; // Arithmetic Operators

  //Multiple by quantity
  let finalCost = totalPerShirt * quantity; // Arithmetic Operators

  return finalCost; // Return value
}

//FUNCTION: FORMAT DATE
function formatDate(userDate) {
  try {
    let d = new Date(userDate);
    return d.toLocaleDateString();
  } catch (err) {
    return userDate;
  }
}

//VALIDATION FUNCTION
function validateForm() {
  let isGood = true; //Boolean
  let errors = []; //Arrays

  let firstName = document.getElementById("firstName").value.trim(); // String Methods
  let lastName = document.getElementById("lastName").value.trim();
  let email = document.getElementById("email").value.trim();
  let quantity = Number(document.getElementById("quantity").value);
  let deliveryDate = document.getElementById("deliveryDate").value;

  //VALIDATION CHECKS
  if (firstName === "" || lastName === "") {
    isGood = false;
    errors.push("Enter first and last name.");
  }
  if (quantity < 1) {
    isGood = false;
    errors.push("Quantity must be at least 1.");
  }

  //Must pick at least one color
  let checkedColors = document.querySelectorAll('input[name="color"]:checked');
  if (checkedColors.length === 0) {
    isGood = false;
    errors.push("Select at least one color.");
  }

  //Must pick a date
  let chosenSize = document.querySelector('input[name="size"]:checked');
  if (chosenSize === null) {
    isGood = false;
    errors.push("Select a size.");
  }
  return isGood;
}
