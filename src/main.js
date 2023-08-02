import isValid from "./email-validator";
import "../styles/style.css";

class Section {
  constructor(title, buttonText) {
    this.title = title;
    this.buttonText = buttonText;
    this.sectionElement = this.joinProgramSection();
  }

  joinProgramSection() {
    const joinProgram = document.createElement("section");
    joinProgram.className = "app-section app-section--join-our-program";
    const title = document.createElement("h2");
    title.className = "app-title";
    title.textContent = `${this.title}`;
    const subtitle = document.createElement("h3");
    subtitle.className = "app-subtitle";
    subtitle.textContent =
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    const form = document.createElement("form");
    form.id = "subscribeForm";
    const inputEmail = document.createElement("input");

    inputEmail.type = "email";
    inputEmail.className = "input-email";
    inputEmail.placeholder = "email";
    inputEmail.id = "email";
    inputEmail.name = "email";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className =
      "app-section__button subscribe-button app-section__button--read-more";
    submitButton.textContent = this.buttonText;

    form.appendChild(inputEmail);
    form.appendChild(submitButton);
    joinProgram.appendChild(title);
    joinProgram.appendChild(subtitle);
    joinProgram.appendChild(form);

    const appContainer = document.getElementById("app-container");
    appContainer.insertBefore(
      joinProgram,
      appContainer.querySelector("footer")
    );

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      const email = inputEmail.value;
      const isEmailValid = isValid(email);

      if (isEmailValid) {
        if (submitButton.textContent === "Subscribe") {
          // Subscribe functionality
          localStorage.setItem("subscriptionEmail", email);
          submitButton.textContent = "Unsubscribe";
          inputEmail.classList.add("hide-input");
        } else {
          // Unsubscribe functionality
          localStorage.removeItem("subscriptionEmail");
          inputEmail.value = "";
          submitButton.textContent = "Subscribe";
          inputEmail.classList.remove("hide-input");
        }
      } else {
        alert("Invalid email address. Please try again");
      }
    });

    const savedEmail = localStorage.getItem("subscriptionEmail");
    if (savedEmail) {
      inputEmail.value = savedEmail;
      submitButton.textContent = "Unsubscribe";
      inputEmail.classList.add("hide-input");
    }

    return joinProgram;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sectionCreator = new Section("Join Our Program", "Subscribe");
  const appContainer = document.getElementById("app-container");
  appContainer.insertBefore(joinProgram, appContainer.querySelector("footer"));
});
