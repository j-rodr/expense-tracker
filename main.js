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
let paymentMethodSelect = document.getElementById("methods-select")
let paymentMethodSelectOptions = document.querySelectorAll(".method-option")
let categorySelect = document.getElementById("categories-select")
let categorySelectOptions = document.querySelectorAll(".category-option")
let categoryInput = document.getElementById("expense-category")
let paymentMethodInput = document.getElementById("expense-payment-method")
let editExpenseBtn = document.getElementById("edit-expense-btn")
let editExpenseTitle = document.getElementById("edit-transaction-title")
let addExpenseTitle = document.getElementById("add-transaction-title")

// Statistics toggles

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

// Callout toggle

hideCalloutBtn.addEventListener("click", () => {
   callout.classList.add("fade-out")
   callout.addEventListener("animationend", () => {
      callout.classList.add("is-hidden")
   })
})

// Add senction toggles

addSectionBtn.addEventListener("click", () => addSectionToggle("show"))

hideAddSectionBtn.addEventListener("click", () => {
   addSectionToggle("hide")
   showElement(addExpenseBtn)
   hideElement(editExpenseBtn)
   if (!EXPENSES.length) {
      showElement(emptyMessage)
   }
})

// Add expense button

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

      hideElement(editExpenseTitle)
      showElement(addExpenseTitle)

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

      showElement(editExpenseTitle)
      hideElement(addExpenseTitle)
   }
}

function parseDate(date, mode) {
   // E.g. "2022-08-15" to "August 15, 2022"

   // (reverse) E.g. "August 15, 2022" to "2022-08-15"

   const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];

   if (!mode) {
      return `${MONTHS[parseInt(date.slice(5, 7)) - 1]} ${parseInt(date.slice(8, 10))}, ${date.slice(0, 4)}`
   }

   if (mode === "reverse") {
      let splitDate = date.split(" ")

      let year = splitDate[2]
      let month = (MONTHS.findIndex(month => month === splitDate[0]) + 1).toString().padStart(2, "0")
      let day = splitDate[1].slice(0, splitDate[1].length - 1).padStart(2, "0")

      return `${year}-${month}-${day}`
   }

}

function clearAddFields() {
   document.getElementById("expense-category").value = ""
   document.getElementById("expense-name").value = ""
   document.getElementById("expense-date").value = ""
   document.getElementById("expense-amount").value = ""
   document.getElementById("expense-payment-method").value = ""
}

function capitalize(string) {
   return string[0].toUpperCase() + string.slice(1)
}

/* Business logic */

let EXPENSES = [
   /*{
      id: 1,
      category: {
         name: "category",
         color: "#000"
      },
      name: "Dinner bills",
      date: "August 3, 2022",
      amount: 115.99,
      paymentMethod: "Card"
   }*/
]

let CATEGORIES = []
let PAYMENT_METHODS = ["Card", "Cash", "Check"]
let COLORS = ["#8678ea", "#21dad7", "#d16eff", "#ffabf6", "#ff007a", "#3866f2"]

if (EXPENSES.length) {
   hideElement(emptyMessage)
}

renderExpenses()
renderSelectOptions()
calculateTotal()

// Display all expenses

function renderExpenses() {
   expensesSection.innerHTML = ""
   for (let { id, category, name, date, amount, paymentMethod } of EXPENSES) {
      expensesSection.innerHTML += expenseElement(id, category, name, date, amount, paymentMethod)
   }
}

// Display all categories in form

function renderSelectOptions() {
   categorySelect.innerHTML = ""
   paymentMethodSelect.innerHTML = ""

   for (let category of CATEGORIES) {
      categorySelect.innerHTML += `<p class="category-option">${category.name}</p>`
   }

   for (let paymentMethod of PAYMENT_METHODS) {
      paymentMethodSelect.innerHTML += `<p class="method-option">${paymentMethod}</p>`
   }

   document.querySelectorAll(".method-option").forEach(option => {
      option.addEventListener("click", function () {
         paymentMethodInput.value = this.innerText
      })
   })

   document.querySelectorAll(".category-option").forEach(option => {
      option.addEventListener("click", function () {
         categoryInput.value = this.innerText
      })
   })
}

// Create expense card

function expenseElement(id, category, name, date, amount, paymentMethod) {
   return `
   <div class="expense" data-id="${id}" style="border-left-color: ${category.color}">
      <div class="expense__edit edit-expense" onclick="editExpense(${id})">
         <img src="./assets/hamburger-menu-icon.svg" alt="Edit icon">
      </div>
      <div class="expense__group">
         <p class="expense__category" id="expense-category" style="color: ${category.color}">${category.name}</p>
         <p class="expense__name" id="expense-name">${name}</p>
         <p class="expense__date" id="expense-date">${date}</p>
      </div>
      <div class="expense__group">
         <p class="expense__amount" id="expense-amount">$${amount}</p>
         <p class="expense__payment-method" id="expense-payment-method">Paid with ${paymentMethod.toLowerCase()}</p>
      </div>
      <div class="expense__delete delete-expense" onclick="deleteExpense(${id})">
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

   if (parseFloat(amountInput.value) <= 0) {
      alert("The expense amount can't be less than $1.")
      return;
   }

   if (!PAYMENT_METHODS.includes(capitalize(paymentMethodInput.value.toLowerCase().trim()))) {
      PAYMENT_METHODS.push(capitalize(paymentMethodInput.value.toLowerCase().trim()))
   }

   let categoryName = capitalize(categoryInput.value.toLowerCase().trim())

   if (!CATEGORIES.some(category => category.name === categoryName)) {

      let randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]

      if (EXPENSES.length) {
         while (EXPENSES[EXPENSES.length - 1].category.color === randomColor) {
            randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
         }
      }

      CATEGORIES.push({
         name: categoryName,
         color: randomColor
      })
   }

   EXPENSES.push({
      id: EXPENSES.reduce((acc, current) => current.id > acc ? current.id : acc, 0) + 1,
      category: CATEGORIES.filter(category => category.name === categoryName)[0],
      name: nameInput.value,
      date: parseDate(dateInput.value),
      amount: parseFloat(amountInput.value),
      paymentMethod: capitalize(paymentMethodInput.value.toLowerCase().trim())
   })

   clearAddFields()
   renderSelectOptions()
   calculateTotal()

   setTimeout(() => {
      alert("The expense was successfully added.")
   }, 100)
}

/* Delete expense */

function deleteExpense(id) {
   let confirmed = confirm("Are you sure you want to delete this expense? This process can't be undone.")
   if (confirmed) {
      EXPENSES = EXPENSES.filter(expense => expense.id !== id)

      let expenseCard = document.querySelector(`.expense[data-id="${id}"]`)
      expenseCard.classList.add("fade-out")

      expenseCard.addEventListener("animationend", () => {
         renderExpenses()

         if (!EXPENSES.length) {
            showElement(emptyMessage)
         }
      })

      calculateTotal()
   }
}

/* Update expense */

let currentExpenseID;

function editExpense(id) {
   currentExpenseID = id
   addSectionToggle("show")

   showElement(editExpenseBtn)
   hideElement(addExpenseBtn)

   showElement(editExpenseTitle)
   hideElement(addExpenseTitle)

   let categoryInput = document.getElementById("expense-category")
   let nameInput = document.getElementById("expense-name")
   let dateInput = document.getElementById("expense-date")
   let amountInput = document.getElementById("expense-amount")
   let paymentMethodInput = document.getElementById("expense-payment-method")

   let currentExpense = EXPENSES.filter(expense => expense.id === id)[0]

   categoryInput.value = currentExpense.category.name
   nameInput.value = currentExpense.name
   dateInput.value = parseDate(currentExpense.date, "reverse")
   amountInput.value = currentExpense.amount
   paymentMethodInput.value = currentExpense.paymentMethod

   renderSelectOptions()
}

editExpenseBtn.addEventListener("click", () => {
   if (currentExpenseID) {

      let categoryInput = document.getElementById("expense-category")
      let nameInput = document.getElementById("expense-name")
      let dateInput = document.getElementById("expense-date")
      let amountInput = document.getElementById("expense-amount")
      let paymentMethodInput = document.getElementById("expense-payment-method")

      if (!categoryInput.value || !nameInput.value || !dateInput.value || !amountInput.value || !paymentMethodInput.value) {
         alert("You must fill in all fields to add a transaction.")
         return;
      }

      if (parseFloat(amountInput.value) <= 0) {
         alert("The expense amount can't be less than $1.")
         return;
      }

      if (!PAYMENT_METHODS.includes(capitalize(paymentMethodInput.value.toLowerCase().trim()))) {
         PAYMENT_METHODS.push(capitalize(paymentMethodInput.value.toLowerCase().trim()))
      }

      let categoryName = capitalize(categoryInput.value.toLowerCase().trim())

      if (!CATEGORIES.some(category => category.name === categoryName)) {

         let randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]

         if (EXPENSES.length) {
            while (EXPENSES[EXPENSES.length - 1].category.color === randomColor) {
               randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
            }
         }

         CATEGORIES.push({
            name: categoryName,
            color: randomColor
         })
      }

      EXPENSES = EXPENSES.filter(expense => expense.id !== currentExpenseID)

      EXPENSES.push({
         id: currentExpenseID,
         category: CATEGORIES.filter(category => category.name === categoryName)[0],
         name: nameInput.value,
         date: parseDate(dateInput.value),
         amount: parseFloat(amountInput.value),
         paymentMethod: capitalize(paymentMethodInput.value.toLowerCase().trim())
      })

      clearAddFields()

      setTimeout(() => {
         alert("The expense was successfully updated.")
      }, 100)

      renderExpenses()
      renderSelectOptions()
      calculateTotal()
   }
})

/* Custom select menus */

paymentMethodInput.addEventListener("click", () => {
   paymentMethodSelect.style.visibility = "visible"
   if (!PAYMENT_METHODS.length) paymentMethodSelect.innerHTML = "<p style='color: #707070; white-space: nowrap'>Insert a payment method</p>"
})

categoryInput.addEventListener("click", () => {
   categorySelect.style.visibility = "visible"
   if (!CATEGORIES.length) categorySelect.innerHTML = "<p style='color: #707070; white-space: nowrap'>Create a category</p>"
})

document.addEventListener("click", (e) => {
   if (e.target !== paymentMethodInput) {
      paymentMethodSelect.style.visibility = "hidden"
   }

   if (e.target !== categoryInput) {
      categorySelect.style.visibility = "hidden"
   }
})

/* Select menus validation */

paymentMethodInput.addEventListener("keyup", (e) => {
   let inputValue = e.target.value
   paymentMethodInput.value = inputValue.replace(/\d/g, '')
})

categoryInput.addEventListener("keyup", (e) => {
   let inputValue = e.target.value
   categoryInput.value = inputValue.replace(/\d/g, '')
})

/* Display total */

function calculateTotal() {
   let totalExpenses = document.getElementById("total-expenses")

   let total = EXPENSES.reduce((acc, current) => acc + current.amount, 0)

   totalExpenses.innerText = `$${total.toFixed(2)}`
}