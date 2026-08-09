import { routes, fallbackRoute, type Route } from './routes';
import { splitLetters } from '../scripts/splitLetters';
import { mountLayout, setActiveNavItem } from './layout';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('#app não encontrado');
}

/** Deve acompanhar --view-transition em src/css/layout.css. */
const TRANSITION_MS = 180;

let currentRoute: Route | null = null;
let view: HTMLElement | null = null;
let firstRender = true;

/** Cada navegação recebe um token; renders obsoletos são abortados. */
let navToken = 0;

function resolveRoutePath(pathname: string): string {
  return pathname in routes ? pathname : fallbackRoute;
}

function transitionDuration(): number {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 0
    : TRANSITION_MS;
}

function waitForTransition(el: HTMLElement, duration: number): Promise<void> {
  if (duration <= 0) return Promise.resolve();

  return new Promise(resolve => {
    let fallbackTimer = 0;
    let settled = false;

    const finish = (event?: Event) => {
      // transitionend das letras (.shake-text) borbulha até o #view
      if (event && event.target !== el) return;
      if (settled) return;

      settled = true;
      el.removeEventListener('transitionend', finish);
      window.clearTimeout(fallbackTimer);
      resolve();
    };

    fallbackTimer = window.setTimeout(finish, duration + 60);
    el.addEventListener('transitionend', finish);
  });
}

export async function renderPage() {
  if (!app) {
    throw new Error('#app não encontrado');
  }

  const target = view ?? mountLayout(app);
  view = target;

  const token = ++navToken;
  const routePath = resolveRoutePath(window.location.pathname);
  const route = routes[routePath];

  if (!firstRender) {
    target.classList.add('is-leaving');
    await waitForTransition(target, transitionDuration());
    if (token !== navToken) return;
  }

  currentRoute?.onUnmount?.();
  currentRoute = null;

  const html = await route.render();
  if (token !== navToken) return;

  target.innerHTML = html;
  await route.onMount?.(target);
  if (token !== navToken) return;

  splitLetters('.shake-text');
  bindNavigation(target);
  setActiveNavItem(routePath);

  currentRoute = route;
  firstRender = false;

  target.classList.remove('is-leaving');
  target.classList.add('is-entering');
  void target.offsetWidth;

  requestAnimationFrame(() => {
    if (token !== navToken) return;
    target.classList.remove('is-entering');
  });
}

function bindNavigation(root: HTMLElement) {
  const links = root.querySelectorAll('a[data-route]');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const route = link.getAttribute('data-route');
      if (!route) return;

      const path = route === '/' ? '/' : `/${route}`;
      if (path === window.location.pathname) return;

      history.pushState({}, '', path);
      renderPage();
    });
  });
}

export function initRouter() {
  if (!app) {
    throw new Error('#app não encontrado');
  }

  view = mountLayout(app);

  const nav = app.querySelector<HTMLElement>('.sidenav');
  if (nav) {
    // A nav é persistente: vincula uma única vez, fora do ciclo de render.
    bindNavigation(nav);
  }

  window.addEventListener('popstate', renderPage);
  renderPage();
}
