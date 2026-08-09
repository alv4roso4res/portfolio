import { projects } from '../data/projects';
import { escapeHtml } from '../scripts/escapeHtml';

function renderItem(slug: string, name: string, tagline: string): string {
  return `
    <li class="projects-row">
      <button type="button" class="projects-item" data-slug="${escapeHtml(slug)}" aria-haspopup="dialog">
        <span class="label shake-text">${escapeHtml(name)}</span>
        <span class="projects-tagline shake-text">${escapeHtml(tagline)}</span>
      </button>
    </li>
  `;
}

function renderModal(): string {
  return `
    <div class="project-modal" id="projectModal" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle" hidden>
      <div class="project-modal__backdrop" data-close></div>
      <div class="project-modal__panel">
        <button type="button" class="project-modal__close shake-text" data-close aria-label="Fechar">fechar</button>
        <h2 id="projectModalTitle" class="project-modal__title shake-text"></h2>
        <div class="project-modal__body">
          <p class="project-modal__description"></p>
          <ul class="project-modal__stack"></ul>
          <div class="project-modal__media"></div>
          <div class="project-modal__links"></div>
        </div>
      </div>
    </div>
  `;
}

export function renderProjects(): string {
  return `
    <main class="container">
      <section class="content projects-content">
        <h1 class="title shake-text">Projetos</h1>

        <p class="intro shake-text">
          Algumas coisas que eu construí, entre trabalho e curiosidade.
        </p>

        <div class="group projects-group">
          <ul class="links projects-list" id="projectsList">
            ${projects
              .map(project =>
                renderItem(project.slug, project.name, project.tagline)
              )
              .join('')}
          </ul>
        </div>
      </section>
    </main>

    ${renderModal()}
  `;
}
