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
      showElement(addSection)

      return;
   }

   if (option === "hide") {
      showElement(expensesHeaderSection)
      showElement(expensesSection)
      hideElement(addSection)

      return;
   }
}

/* Business logic */

const EXPENSES = [
   {
      category: "Groceries",
      name: "Dinner bills",
      date: "August 3, 2022",
      amount: 76.50,
      paymentMethod: "card"
   }
]

// Show/hide empty message

showElement(emptyMessage)

if (EXPENSES.length) {
   hideElement(emptyMessage)
}

// Display all expenses

for (let { category, name, date, amount, paymentMethod } of EXPENSES) {
   expensesSection.innerHTML += expenseElement(category, name, date, amount, paymentMethod)
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


