import { SectionCreator } from "./join-us-section.js";
document.addEventListener("DOMContentLoaded", () => {
  const section = new SectionCreator();
  const standard = section.create("standard");

  const footer = document.querySelector("footer");
  footer.before(standard.sectionElement);
});

// document.addEventListener("load", joinProgramSection);
