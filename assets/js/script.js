'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
//const formMessage = document.getElementById("form-message");


// Add an event listener for form submission

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior

    const targetPage = this.innerHTML.toLowerCase(); // Get the target page name

    // Loop through pages and activate the matching one
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
        window.scrollTo({
          top: page.offsetTop, // Scroll to the top of the section
          behavior: 'smooth'   // Smooth scrolling
        });
      } else {
        page.classList.remove("active");
      }
    });

    // Update the active class on navigation links
    navigationLinks.forEach(link => link.classList.remove("active"));
    this.classList.add("active");
  });
});

function sendMail() {
  var parms = {
    from_name: document.getElementById("fullname").value,
    email_id: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  // Reference to the Send button
  var sendButton = document.getElementById("sendButton");

  emailjs.send("service_b0wl173", "template_dk2yzc6", parms)
    .then(function(res) {
      // Change button text to "Sent"
      sendButton.innerText = "Sent";
      sendButton.disabled = true; // Optionally disable the button to prevent resending

      // Display success message
      document.getElementById("form-message").style.display = 'block';
      document.getElementById("form-message").innerText = "Message sent successfully!";
      document.getElementById("form-message").style.color = 'white';

      // Revert the button back to "Send" after 2 seconds
      setTimeout(function() {
        sendButton.innerText = "Send";
        sendButton.disabled = false; // Enable the button again
      }, 2000); // 2 seconds delay
    })
    .catch(function(err) {
      // Handle failure case (optional)
      document.getElementById("form-message").style.display = 'block';
      document.getElementById("form-message").innerText = "Failed to send message. Please try again.";
      document.getElementById("form-message").style.color = 'red';
    });
}
