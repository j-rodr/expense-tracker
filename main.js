let stats = document.getElementById("stats-section")
let statsToggles = document.querySelectorAll(".statistics-toggle")
let statToggleBtn = document.querySelector(".btn.statistics-toggle")
let callout = document.querySelector(".callout")
let hideCalloutBtn = document.getElementById("hide-callout")

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


