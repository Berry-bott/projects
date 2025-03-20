import logOut from "./signout.js"; // Import logout function

const bar = document.querySelector(".bars");
const link = document.querySelector(".carrier");
const sun = document.querySelector(".light");
const search = document.querySelector(".search");
const form_ = document.querySelector(".input");
const faq = document.querySelectorAll(".faq");
const direc = document.querySelector(".direction");
const ancho = document.querySelectorAll(".ancho");
const more = document.querySelectorAll(".more-text");
const btns = document.querySelectorAll(".js-btn");

// FOR TOGGLING  ------######
bar.addEventListener("click", togle);

function togle() {
  let svg = bar.querySelector("svg");
  if (svg.classList.contains("fa-bars")) {
    svg.classList.replace("fa-bars", "fa-times");
  } else {
    svg.classList.replace("fa-times", "fa-bars");
  }
  link.classList.toggle("effect");
  console.log(svg);
}

ancho.forEach((ancho) => {
  ancho.addEventListener("click", togle);
});

// ------FOR SCROLL BARS----

window.addEventListener("scroll", () => {
  document
    .querySelector("nav")
    .classList.toggle("window-scroll", window.scrollY > 100);
});

// ----FOR FAQS----

faq.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("open");
    if (faq.classList.contains("open")) {
      faq.classList.add("pink");
    } else {
      faq.classList.remove("pink");
    }
    const icon = faq.querySelector("svg");
    if (icon.classList.contains("fa-plus")) {
      icon.classList.replace("fa-plus", "fa-minus");
    } else {
      icon.classList.replace("fa-minus", "fa-plus");
    }
  });
});

const container = document.addEventListener("click", (event) => {
  let target = event.target;
  if (target.matches(".js-btn")) {
    target.previousElementSibling.classList.toggle("hide");
  }
});

// backgroundColor JS

function toggleBackground() {
let container = document.getElementById('Archievement')
let containerOne = document.getElementById('team')
  document.getElementById("toggleBtn").addEventListener("click", function () {
    this.style.color = this.style.color === 'black' ? 'white' : 'black';
    document.body.classList.toggle("dark-mode");
    container.classList.toggle("dark-mode");
    containerOne.classList.toggle("dark-mode");
  });
}
toggleBackground()

// This is for searchBar
document.querySelectorAll("#searchBox").forEach(searchBox => {


  searchBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if inside a form
      document.getElementById("searchBtn").click(); // Trigger button click
      searchBox.value = "";
    }
  });
})

document.querySelectorAll("#searchBtn").forEach(searchBtn => {
searchBtn.addEventListener("click", function () {

    let searchBox = document.querySelectorAll("#searchBox");
    searchBox.forEach(searchBox => {
      let filter = searchBox.value.trim().toLowerCase();

      let sections = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p,alt"); // Search in headings & paragraphs
      let instance = new Mark(document.body);

      instance.unmark({
        done: function () {
          if (filter) {
            let found = false;
            let firstMatch = null;

            sections.forEach((element) => {
              let text = element.textContent.toLowerCase();
              if (text.includes(filter)) {
                found = true;
                element.classList.add("highlighted-topic"); // Highlight match

                if (!firstMatch) {
                  firstMatch = element; // Store first match for scrolling
            searchBox.innerHTML =`No Result Found`; 

                }
              } else {
                element.classList.remove("highlighted-topic"); // Remove highlight if no match
              }
            });
            if (firstMatch) {
              // Scroll to the first match if found
              firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            if (found) {
              searchBox.placeholder = ""; 
          } else {
              searchBox.placeholder = "No Result Found"; 
              searchBox.classList.add("no-result");
              
          }
          
          }

        }
        
      });
      searchBox.value = "";
    });
  });

})

document.getElementById("logoutButton").addEventListener("click", logOut)

let welcomeText = document.getElementById('welcomeText')
function welcome() {
  let fullName = sessionStorage.getItem('username');
  console.log(fullName);
  
  let greeting = "";
  let date = new Date().getHours();

  if (date < 12) {
    greeting = `Good Morning! `;
  } else if (date < 18) {
    greeting = `Good Afernoon! `;
  } else {
    greeting = `Good Evening! `;
  }
  if (fullName) {
    welcomeText.innerHTML = ` <span class="greating">${greeting} ${fullName}.</span>`;
    welcomeText.style.opacity = "1"; // Ensure it's visible

    setTimeout(() => {
      welcomeText.style.transition = "opacity 1s ease-out";
      welcomeText.style.opacity = "0"; // Fade out

      setTimeout(() => {
        welcomeText.innerHTML = ""; // Remove text after fade-out
      }, 5000); // Wait for fade-out to complete
    }, 10000); // Display for 5 seconds
  }
  else {
    setTimeout(() => {
      welcomeText.style.transition = "opacity 1s ease-out";
      welcomeText.style.opacity = "0"; // Fade out

      setTimeout(() => {
        welcomeText.innerHTML = ""; // Remove text after fade-out
      }, 1000); // Wait for fade-out to complete
    }, 20000);
    welcomeText.innerHTML = ` <span class='greating'>${greeting} and Welcome Onboard. </span>`;
  }
}
window.onload = welcome();

