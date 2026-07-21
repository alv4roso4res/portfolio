import { routes, fallbackRoute, type Route } from './routes';
import { splitLetters } from '../scripts/splitLetters';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('#app não encontrado');
}

let currentRoute: Route | null = null;

function resolveRoute(pathname: string): Route {
  return routes[pathname] ?? routes[fallbackRoute];
}

export async function renderPage() {
  const path = window.location.pathname;
  const route = resolveRoute(path);

  if (!app) {
  throw new Error('#app não encontrado');
  }
  currentRoute?.onUnmount?.();
  app.innerHTML = await route.render();
  await route.onMount?.(app);

  splitLetters('.shake-text');
  bindNavigation(app);

  currentRoute = route;
}

function bindNavigation(root: HTMLElement) {
  const links = root.querySelectorAll('a[data-route]');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const route = link.getAttribute('data-route');
      if (!route) return;

      history.pushState({}, '', route === '/' ? '/' : `/${route}`);
      renderPage();
    });
  });
}

export function initRouter() {
  window.addEventListener('popstate', renderPage);
  renderPage();
}
