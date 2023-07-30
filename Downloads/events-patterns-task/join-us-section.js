class Section {
    constructor(title, buttonText) {
      this.title = title;
      this.buttonText = buttonText;
      this.sectionElement = this.joinProgramSection();
    }
  
    joinProgramSection() {
      const joinProgram = document.createElement("section");
      // joinProgram.classList.add("app-section");
      joinProgram.innerHTML = `
      <section class="app-section app-section--join-our-program">
        <h2 class="app-title">${this.title}</h2>
        <h3 class="app-subtitle">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h3>
        <form action="email" id="subscribeForm">
          <input
            type="email"
            class="input-email"
            placeholder="EMAIL"
            id="email"
            name="email"
            value="email"
          />
          <button type="submit" class="app-section__button subscribe-button app-section__button--read-more">
            ${this.buttonText}
          </button>
        </form>
      </section>
    `;
      return joinProgram;
    }
    remove() {
      this.sectionElement.remove();
    }
  }
  class SectionCreator {
    create(type) {
      switch (type) {
        case "standard":
          return new Section("Join Our Program", "subscribe");
        case "advanced":
          return new Section(
            "Join Our Advanced Program",
            "Subscribe to Advanced Program"
          );
      }
    }
  }
  
  export { SectionCreator };
  