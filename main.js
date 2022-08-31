/* HTML elements */

let stats = document.getElementById("stats-section")
let statsToggles = document.querySelectorAll(".statistics-toggle")
let statToggleBtn = document.querySelector(".btn.statistics-toggle")
let callout = document.querySelector(".callout")
let emptyMessage = document.getElementById("empty-message")
let hideCalloutBtn = document.getElementById("hide-callout")
let addSectionBtn = document.getElementById("add-section-btn")
let hideAddSectionBtn = document.getElementById("hide-add-section-btn")
let expensesSection = document.getElementById("expenses-section")
let addExpenseBtn = document.getElementById("add-expense-btn")

/* Event listeners */

statsToggles.forEach(toggle => {
   toggle.addEventListener("click", function () {
      if (stats.classList.contains("is-hidden")) {
         if (this.classList.contains("btn")) {
            statToggleBtn.classList.add("is-hidden")
         }
         stats.classList.remove("is-hidden")
         stats.classList.add("fade-in")
      } else {
         if (!this.classList.contains("btn")) {
            statToggleBtn.classList.remove("is-hidden")
         }
         stats.classList.add("is-hidden")
         stats.classList.remove("fade-in")
      }
   })
})

hideCalloutBtn.addEventListener("click", () => {
   callout.classList.add("fade-out")
   callout.addEventListener("animationend", () => {
      callout.classList.add("is-hidden")
   })
})

addSectionBtn.addEventListener("click", () => addSectionToggle("show"))

hideAddSectionBtn.addEventListener("click", () => addSectionToggle("hide"))

addExpenseBtn.addEventListener("click", addExpense)

/* General-purpose functions */

function hideElement(element) {
   element.classList.add("is-hidden")
}

function showElement(element) {
   element.classList.remove("is-hidden")
}

function addSectionToggle(option) {
   let addSection = document.getElementById("add-section")
   let expensesHeaderSection = document.getElementById("expenses-header")
   let expensesSection = document.getElementById("expenses-section")

   if (option === "show") {
      hideElement(expensesHeaderSection)
      hideElement(expensesSection)
      hideElement(emptyMessage)
      showElement(addSection)

      return;
   }

   if (option === "hide") {
      showElement(expensesHeaderSection)
      showElement(expensesSection)
      hideElement(addSection)

      if (!EXPENSES.length) {
         showElement(emptyMessage)
      }

      renderExpenses()

      return;
   }
}

function parseDate(date) {
   // E.g. "2022-08-15" to "August 8, 2022" 

   const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];

   return `${MONTHS[parseInt(date.slice(5, 7)) - 1]} ${parseInt(date.slice(8, 10))}, ${date.slice(0, 4)}`
}

function clearAddFields() {
   document.getElementById("expense-category").value = ""
   document.getElementById("expense-name").value = ""
   document.getElementById("expense-date").value = ""
   document.getElementById("expense-amount").value = ""
   document.getElementById("expense-payment-method").value = ""
}

/* Business logic */

const EXPENSES = []

// Show/hide empty message

if (EXPENSES.length) {
   hideElement(emptyMessage)
}

// Display all expenses

renderExpenses()

function renderExpenses() {
   expensesSection.innerHTML = ""
   for (let { category, name, date, amount, paymentMethod } of EXPENSES) {
      expensesSection.innerHTML += expenseElement(category, name, date, amount, paymentMethod)
   }
}

// Create expense card

function expenseElement(category, name, date, amount, paymentMethod) {
   return `
   <div class="expense">
      <div class="expense__edit" id="edit-expense">
         <img src="./assets/hamburger-menu-icon.svg" alt="Edit icon">
      </div>
      <div class="expense__group">
         <p class="expense__category" id="expense-category">${category}</p>
         <p class="expense__name" id="expense-name">${name}</p>
         <p class="expense__date" id="expense-date">${date}</p>
      </div>
      <div class="expense__group">
         <p class="expense__amount" id="expense-amount">$${amount}</p>
         <p class="expense__payment-method" id="expense-payment-method">Paid with ${paymentMethod}</p>
      </div>
      <div class="expense__delete" id="delete-expense">
         <img src="./assets/cross-icon-medium.svg" alt="Delete icon">
      </div>
   </div>
   `
}

// Add expense card

function addExpense() {
   let categoryInput = document.getElementById("expense-category")
   let nameInput = document.getElementById("expense-name")
   let dateInput = document.getElementById("expense-date")
   let amountInput = document.getElementById("expense-amount")
   let paymentMethodInput = document.getElementById("expense-payment-method")

   if (!categoryInput.value || !nameInput.value || !dateInput.value || !amountInput.value || !paymentMethodInput.value) {
      alert("You must fill in all fields to add a transaction.")
      return;
   }

   if (parseInt(amountInput.value) <= 0) {
      alert("The expense amount can't be less than $1.")
      return;
   }

   EXPENSES.push({
      id: EXPENSES.reduce((acc, current) => current.id > acc ? current.id : acc, 0) + 1,
      category: categoryInput.value,
      name: nameInput.value,
      date: parseDate(dateInput.value),
      amount: parseInt(amountInput.value),
      paymentMethod: paymentMethodInput.value
   })

   clearAddFields()

   setTimeout(() => {
      alert("The expense was successfully added.")
   }, 100)
}


