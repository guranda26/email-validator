import isValid from "./email-validator";
import "../styles/style.css";

class Section {
  constructor(title, buttonText) {
    this.title = title;
    this.buttonText = buttonText;
    this.sectionElement = this.createSection();
  }

  createSection() {
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

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      const email = inputEmail.value;
      const isEmailValid = isValid(email);

      if (isEmailValid) {
        if (submitButton.textContent === "Subscribe") {
          
          localStorage.setItem("subscriptionEmail", email);
          submitButton.textContent = "Unsubscribe";
          inputEmail.classList.add("hide-input");

    
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "/subscribe", true); // Updated the URL to use the relative path
          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.onload = function () {
            if (xhr.status === 200) {
          
              alert("You have successfully subscribed!");
            } else if (xhr.status === 422) {
              
              const responsePayload = JSON.parse(xhr.responseText);
              alert(`Error: ${responsePayload.error}`);
            } else {
            
              alert("Failed to subscribe. Please try again later.");
            }
          };

          xhr.onerror = function () {
           
            alert("An error occurred. Please try again later.");
          };

          const data = JSON.stringify({ email });
          xhr.send(data);
        } else {
     
          localStorage.removeItem("subscriptionEmail");
          inputEmail.value = "";
          submitButton.textContent = "Subscribe";
          inputEmail.classList.remove("hide-input");

       
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "/unsubscribe", true); 
          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.onload = function () {
            if (xhr.status === 200) {
         
              alert("You have successfully unsubscribed!");
            } else {
           
              alert("Failed to unsubscribe. Please try again later.");
            }
          };

          xhr.onerror = function () {
         
            alert("An error occurred. Please try again later.");
          };

          xhr.send();
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

  populateCommunitySection() {
    fetch("http://localhost:3000/community")
      .then((response) => response.json())
      .then((communityData) => {
        const communitySection = document.querySelector(
          ".app-section--community"
        );
        const communityList = document.createElement("ul");
        communityList.className = "community-list";

        communityData.forEach((person) => {
          const listItem = document.createElement("li");
          listItem.className = "community-list-item";

          const avatar = document.createElement("img");
          avatar.className = "avatar";
          avatar.src = person.avatar;
          avatar.alt = `${person.firstName} ${person.lastName}`;

          const name = document.createElement("h4");
          name.className = "name";
          name.textContent = `${person.firstName} ${person.lastName}`;

          const position = document.createElement("p");
          position.className = "position";
          position.textContent = person.position;

          listItem.appendChild(avatar);
          listItem.appendChild(name);
          listItem.appendChild(position);
          communityList.appendChild(listItem);
        });

        communitySection.innerHTML = "";
        communitySection.appendChild(communityList); 
      })
      .catch((error) => {
        console.error("Error fetching community data:", error);
      });
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const sectionCreator = new Section("Join Our Program", "Subscribe");
  const appContainer = document.getElementById("app-container");


  sectionCreator.populateCommunitySection();


  const footer = document.querySelector("footer");


  appContainer.insertBefore(sectionCreator.sectionElement, footer);


  const handleSubscription = (event) => {
    event.preventDefault();
    const email = inputEmail.value;
    const isEmailValid = isValid(email);

    if (isEmailValid) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/unsubscribe", true); // Updated the URL to use the relative path
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status === 200) {

          const responsePayload = JSON.parse(xhr.responseText);
          if (responsePayload.subscribed) {
            localStorage.setItem("subscriptionEmail", email);
            submitButton.textContent = "Unsubscribe";
            inputEmail.classList.add("hide-input");
            alert("You have successfully subscribed!");
          } else {
            localStorage.removeItem("subscriptionEmail");
            inputEmail.value = "";
            submitButton.textContent = "Subscribe";
            inputEmail.classList.remove("hide-input");
            alert("You have successfully unsubscribed!");
          }
        } else {
          
          alert("Failed to perform the action. Please try again later.");
        }
      };

      xhr.onerror = function () {
      
        alert("An error occurred. Please try again later.");
      };

      const data = JSON.stringify({ email });
      xhr.send(data);
    } else {
      alert("Invalid email address. Please try again");
    }
  };

  const inputEmail = document.getElementById("email");
  const submitButton = document.querySelector(".subscribe-button");


  submitButton.addEventListener("click", handleSubscription);


  const savedEmail = localStorage.getItem("subscriptionEmail");
  if (savedEmail) {
    inputEmail.value = savedEmail;
    submitButton.textContent = "Unsubscribe";
    inputEmail.classList.add("hide-input");
  }
});
