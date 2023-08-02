import { isValid } from "./email-validator";
import "../styles/style.css";

class Section {
  constructor(title, buttonText) {
    this.title = title;
    this.buttonText = buttonText;
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

    const footer = document.querySelector("footer");
    footer.before(joinProgram);

    const subscribeForm = document.getElementById("subscribeForm");
    subscribeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const enterEmail = document.getElementById("email");
      console.log("Entered email is:", enterEmail.value);
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = inputEmail.value;
      const isEmailValid = isValid(email);

      if (isEmailValid) {
        alert("Email address is valid");
      } else {
        alert("Invalid email address. Please try again");
      }
    });
  }
}

class SectionCreator {
  create(type) {
    switch (type) {
      case "standard":
        return new Section("Join Our Program", "Subscribe");
      case "advanced":
        return new Section(
          "Join Our Advanced Program",
          "Subscribe to Advanced Program"
        );
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sectionCreator = new SectionCreator();
  const standardSection = sectionCreator.create("standard");
  standardSection.joinProgramSection(); // Difference 2
  const appContainer = document.getElementById("app-container");
  appContainer.appendChild(standardSection.sectionElement);
});
