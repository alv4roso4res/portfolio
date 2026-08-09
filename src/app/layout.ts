import { splitLetters } from '../scripts/splitLetters';

type NavItem = {
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: 'inicio', path: '/' },
  { label: 'projetos', path: '/projects' },
  { label: 'contato', path: '/contact' },
];

function toRouteAttr(path: string): string {
  return path === '/' ? '/' : path.slice(1);
}

function renderNav(): string {
  return `
    <nav class="sidenav" aria-label="Navegação principal">
      <ul class="sidenav-list">
        ${navItems
          .map(
            item => `
          <li class="sidenav-item">
            <a class="sidenav-link shake-text" href="${item.path}" data-route="${toRouteAttr(item.path)}">${item.label}</a>
          </li>
        `
          )
          .join('')}
      </ul>
    </nav>
  `;
}

/**
 * Injeta a casca persistente (nav + #view) dentro do #app uma única vez.
 * Retorna o #view, que é o único elemento trocado a cada navegação.
 */
export function mountLayout(root: HTMLElement): HTMLElement {
  const mounted = root.querySelector<HTMLElement>('#view');
  if (mounted) return mounted;

  // a shell mantém nav e conteúdo como um bloco só, centralizado no desktop
  root.innerHTML = `<div class="shell">${renderNav()}<div id="view" class="view"></div></div>`;

  splitLetters('.sidenav .shake-text');

  const view = root.querySelector<HTMLElement>('#view');
  if (!view) {
    throw new Error('#view não encontrado');
  }

  return view;
}

export function setActiveNavItem(pathname: string): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('.sidenav-link');

  links.forEach(link => {
    const isActive = link.pathname === pathname;

    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
