import "./styles.css";
import { contactCards, faqItems, navItems, projects, sections } from "./content.js";

const app = document.querySelector("#app");
const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

function cardTemplate({ title, body }) {
  return `
    <article class="content-card">
      <span class="card-accent" aria-hidden="true"></span>
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `;
}

function sectionTemplate(section) {
  const modifier = section.tone === "muted" ? " section--muted" : "";
  const note = section.note ? `<p class="section-note">${section.note}</p>` : "";

  return `
    <section class="section${modifier}" id="${section.id}">
      <div class="container">
        <div class="section-intro">
          <p class="eyebrow">${section.eyebrow}</p>
          <h2>${section.title}</h2>
          <p>${section.body}</p>
        </div>
        <div class="cards-grid${section.id === "metodo" ? " cards-grid--five" : ""}">
          ${section.cards.map(cardTemplate).join("")}
        </div>
        ${note}
      </div>
    </section>
  `;
}

function projectTemplate(project) {
  const image = `
    <figure class="project-card__media">
      <img src="${assetPath(project.image)}" alt="Evidência visual do projeto ${project.title}" loading="lazy" />
    </figure>
  `;
  const content = `
    ${image}
    <h3>${project.title}</h3>
    <p>${project.body}</p>
  `;

  if (project.url) {
    return `
      <a class="project-card" href="${project.url}" target="_blank" rel="noopener noreferrer">
        ${content}
      </a>
    `;
  }

  return `<article class="project-card project-card--static">${content}</article>`;
}

function navTemplate(extraClass = "") {
  return navItems
    .map(
      (item) =>
        `<a class="${extraClass}" href="#${item.target}" data-nav-link>${item.label}</a>`,
    )
    .join("");
}

function render() {
  app.innerHTML = `
    <header class="site-header" data-header>
      <a class="brand" href="#top" aria-label="Assolin Tecnologia">
        <img src="${assetPath("assets/brand/assolin-tecnologia-logo.png")}" alt="Assolin Tecnologia" />
      </a>
      <nav class="desktop-nav" aria-label="Navegação principal">
        ${navTemplate()}
      </nav>
      <a class="button button--primary header-cta" href="#contato">Falar sobre meu projeto</a>
      <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu">
        Menu
      </button>
    </header>

    <main id="top">
      <section class="hero">
        <img class="hero__background" src="${assetPath("assets/hero/hero-background.png")}" alt="" aria-hidden="true" />
        <div class="hero__overlay" aria-hidden="true"></div>
        <div class="container hero__content">
          <p class="hero__tag">Assolin Tecnologia</p>
          <h1>Presença digital que cresce com o seu negócio.</h1>
          <p>Criamos sites e soluções digitais práticas para pequenos negócios, começando pelo essencial e evoluindo conforme surgem necessidades reais.</p>
          <div class="hero__actions">
            <a class="button button--primary" href="#contato">Falar sobre meu projeto</a>
            <a class="button button--secondary" href="#projetos">Ver projetos</a>
          </div>
        </div>
      </section>

      ${sections.slice(0, 3).map(sectionTemplate).join("")}

      <section class="section section--muted" id="projetos">
        <div class="container">
          <div class="section-intro">
            <p class="eyebrow">Projetos</p>
            <h2>Projetos que mostram problema, solução e evolução.</h2>
            <p>Cada projeto é apresentado pelo contexto do cliente, pela solução construída e pelo que foi aprendido ou melhorado durante a entrega.</p>
          </div>
          <div class="projects-grid">
            ${projects.map(projectTemplate).join("")}
          </div>
        </div>
      </section>

      ${sections.slice(3).map(sectionTemplate).join("")}

      <section class="section faq" id="faq">
        <div class="container">
          <div class="section-intro">
            <p class="eyebrow">FAQ</p>
            <h2>Perguntas frequentes</h2>
          </div>
          <div class="faq-grid">
            ${faqItems
              .map(
                (item, index) => `
                  <article class="faq-item">
                    <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-answer-${index}">
                      <span>${item.question}</span>
                      <span class="faq-icon" aria-hidden="true">+</span>
                    </button>
                    <div class="faq-answer" id="faq-answer-${index}" hidden>
                      <p>${item.answer}</p>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section contact" id="contato">
        <div class="container">
          <div class="section-intro section-intro--dark">
            <p class="eyebrow">Contato</p>
            <h2>Vamos organizar sua presença digital?</h2>
            <p>Conte o que você precisa melhorar hoje. A partir disso, avaliamos uma solução enxuta para começar e deixamos espaço para evoluir depois.</p>
          </div>
          <div class="cards-grid cards-grid--contact">
            ${contactCards.map(cardTemplate).join("")}
          </div>
          <div class="contact__actions">
            <a class="button button--primary" href="#" aria-disabled="true">Falar sobre meu projeto</a>
            <a class="button button--secondary" href="#" aria-disabled="true">Enviar formulário</a>
          </div>
        </div>
      </section>
    </main>

    <div class="mobile-menu" id="mobile-menu" hidden>
      <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Navegação">
        <div class="mobile-menu__header">
          <h2>Navegação</h2>
          <button class="mobile-menu__close" type="button">Fechar</button>
        </div>
        <nav class="mobile-menu__nav" aria-label="Navegação mobile">
          ${navTemplate("mobile-menu__link")}
        </nav>
      </div>
    </div>
  `;
}

function setupInteractions() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenu = document.querySelector(".mobile-menu__close");
  const mobileLinks = document.querySelectorAll(".mobile-menu [data-nav-link]");
  const faqButtons = document.querySelectorAll(".faq-question");

  const setMenuState = (isOpen) => {
    mobileMenu.hidden = !isOpen;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("has-open-menu", isOpen);
  };

  menuToggle.addEventListener("click", () => setMenuState(true));
  closeMenu.addEventListener("click", () => setMenuState(false));
  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      setMenuState(false);
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const answer = document.querySelector(`#${button.getAttribute("aria-controls")}`);
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isExpanded));
      button.querySelector(".faq-icon").textContent = isExpanded ? "+" : "-";
      answer.hidden = isExpanded;
    });
  });
}

render();
setupInteractions();
