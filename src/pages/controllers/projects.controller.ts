import { projects } from '../../data/projects';
import type { Project, ProjectMedia } from '../../data/projects';
import { splitLetters } from '../../scripts/splitLetters';
import { escapeHtml } from '../../scripts/escapeHtml';

/** Mesma duração das transições de página (--view-transition, src/css/layout.css). */
const TRANSITION_MS = 180;

const FOCUSABLE =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

let cleanup: (() => void) | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function mediaMarkup(media: ProjectMedia): string {
  const alt = escapeHtml(media.alt);
  const src = escapeHtml(media.src);

  if (media.kind === 'video') {
    const poster = media.poster ? ` poster="${escapeHtml(media.poster)}"` : '';
    return `<video controls preload="none" playsinline${poster} src="${src}" aria-label="${alt}"></video>`;
  }

  return `<img src="${src}" alt="${alt}" />`;
}

function thumbMarkup(media: ProjectMedia, index: number, active: number): string {
  const alt = escapeHtml(media.alt);
  const preview =
    media.kind === 'video'
      ? media.poster
      : media.src;

  const inner = preview
    ? `<img src="${escapeHtml(preview)}" alt="Miniatura: ${alt}" loading="lazy" />`
    : `<span class="project-modal__thumb-label">vídeo</span>`;

  return `
    <button type="button" class="project-modal__thumb${index === active ? ' active' : ''}" data-media-index="${index}">
      ${inner}
    </button>
  `;
}

function linksMarkup(project: Project): string {
  const links: string[] = [];

  if (project.url) {
    links.push(
      `<a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">ver ao vivo</a>`
    );
  }

  if (project.repo) {
    links.push(
      `<a href="${escapeHtml(project.repo)}" target="_blank" rel="noopener noreferrer">repositório</a>`
    );
  }

  return links.join('');
}

function replaceWithPlaceholder(el: Element): void {
  const placeholder = document.createElement('div');
  placeholder.className = 'media-placeholder';

  const isThumb = Boolean(el.closest('.project-modal__thumb'));

  if (isThumb) {
    placeholder.classList.add('media-placeholder--thumb');
  }

  // na miniatura não cabe o texto completo
  placeholder.textContent = isThumb ? 'sem mídia' : 'mídia indisponível';
  el.replaceWith(placeholder);
}

export function bindProjects(root: HTMLElement): () => void {
  unbindProjects();

  const list = root.querySelector<HTMLElement>('#projectsList');
  const modal = root.querySelector<HTMLElement>('#projectModal');
  const content = root.querySelector<HTMLElement>('main.container');

  const panel = modal?.querySelector<HTMLElement>('.project-modal__panel');
  const titleEl = modal?.querySelector<HTMLElement>('.project-modal__title');
  const descriptionEl = modal?.querySelector<HTMLElement>(
    '.project-modal__description'
  );
  const stackEl = modal?.querySelector<HTMLElement>('.project-modal__stack');
  const mediaEl = modal?.querySelector<HTMLElement>('.project-modal__media');
  const linksEl = modal?.querySelector<HTMLElement>('.project-modal__links');
  const closeButton = modal?.querySelector<HTMLButtonElement>(
    '.project-modal__close'
  );

  if (
    !list ||
    !modal ||
    !panel ||
    !titleEl ||
    !descriptionEl ||
    !stackEl ||
    !mediaEl ||
    !linksEl ||
    !closeButton
  ) {
    return () => {};
  }

  let current: Project | null = null;
  let activeIndex = 0;
  let opener: HTMLElement | null = null;
  let isOpen = false;
  let closeTimer = 0;

  function pauseVideos(): void {
    mediaEl?.querySelectorAll('video').forEach(video => video.pause());
  }

  function bindMediaFallbacks(): void {
    mediaEl?.querySelectorAll<HTMLElement>('img, video').forEach(el => {
      el.addEventListener('error', () => replaceWithPlaceholder(el));
    });
  }

  function renderMedia(): void {
    if (!current || !mediaEl) return;

    const items = current.media;
    if (!items.length) {
      mediaEl.innerHTML = '';
      return;
    }

    const featured = items[activeIndex] ?? items[0];
    const thumbs =
      items.length > 1
        ? `<div class="project-modal__thumbs">${items
            .map((item, index) => thumbMarkup(item, index, activeIndex))
            .join('')}</div>`
        : '';

    mediaEl.innerHTML = `
      <div class="project-modal__featured">${mediaMarkup(featured)}</div>
      ${thumbs}
    `;

    bindMediaFallbacks();
  }

  function openModal(slug: string, trigger: HTMLElement): void {
    const project = projects.find(item => item.slug === slug);
    if (!project || !modal || !titleEl || !descriptionEl) return;
    if (!stackEl || !linksEl || !closeButton) return;

    current = project;
    activeIndex = 0;
    opener = trigger;

    titleEl.textContent = project.name;
    splitLetters('.project-modal__title');

    descriptionEl.textContent = project.description;
    stackEl.innerHTML = project.stack
      .map(item => `<li>${escapeHtml(item)}</li>`)
      .join('');
    linksEl.innerHTML = linksMarkup(project);
    renderMedia();

    window.clearTimeout(closeTimer);
    modal.hidden = false;

    // o resto do #view sai da árvore de acessibilidade e do foco
    content?.setAttribute('inert', '');
    content?.setAttribute('aria-hidden', 'true');

    void modal.offsetWidth;
    modal.classList.add('is-open');
    isOpen = true;

    closeButton.focus({ preventScroll: true });
  }

  function closeModal(): void {
    if (!isOpen || !modal || !mediaEl) return;

    isOpen = false;
    modal.classList.remove('is-open');
    pauseVideos();

    content?.removeAttribute('inert');
    content?.removeAttribute('aria-hidden');

    const finish = () => {
      if (isOpen) return;
      modal.hidden = true;
      mediaEl.innerHTML = '';
      current = null;
    };

    if (prefersReducedMotion()) {
      finish();
    } else {
      closeTimer = window.setTimeout(finish, TRANSITION_MS);
    }

    opener?.focus({ preventScroll: true });
    opener = null;
  }

  function trapFocus(event: KeyboardEvent): void {
    if (!panel) return;

    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0);

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (!active || !panel.contains(active)) {
      event.preventDefault();
      first.focus({ preventScroll: true });
      return;
    }

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus({ preventScroll: true });
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  }

  const onListClick = (event: Event) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest<HTMLElement>('[data-slug]');
    if (!button) return;

    const slug = button.dataset.slug;
    if (!slug) return;

    openModal(slug, button);
  };

  const onModalClick = (event: Event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    if (target.closest('[data-close]')) {
      closeModal();
      return;
    }

    const thumb = target.closest<HTMLElement>('[data-media-index]');
    if (!thumb) return;

    const index = Number(thumb.dataset.mediaIndex);
    if (Number.isNaN(index) || index === activeIndex) return;

    pauseVideos();
    activeIndex = index;
    renderMedia();

    mediaEl
      .querySelector<HTMLElement>(`[data-media-index="${index}"]`)
      ?.focus({ preventScroll: true });
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key === 'Tab') {
      trapFocus(event);
    }
  };

  list.addEventListener('click', onListClick);
  modal.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onKeydown);

  const dispose = () => {
    list.removeEventListener('click', onListClick);
    modal.removeEventListener('click', onModalClick);
    document.removeEventListener('keydown', onKeydown);

    window.clearTimeout(closeTimer);
    pauseVideos();

    content?.removeAttribute('inert');
    content?.removeAttribute('aria-hidden');

    isOpen = false;
    opener = null;
    current = null;
  };

  cleanup = dispose;
  return dispose;
}

export function unbindProjects(): void {
  cleanup?.();
  cleanup = null;
}
