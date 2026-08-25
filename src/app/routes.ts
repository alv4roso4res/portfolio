import { renderHome } from '../pages/home';

export type Route = {
  /**
   * Aquece os módulos da rota (página + controller) de uma vez só. O router
   * chama isso em paralelo com a transição de saída e no hover dos links; sem
   * ele, cada import() só começaria depois da animação, um depois do outro.
   */
  preload?: () => Promise<unknown>;
  render: () => Promise<string> | string;
  onMount?: (root: HTMLElement) => void | Promise<void>;
  onUnmount?: () => void;
};

export const routes: Record<string, Route> = {
  // a home é a primeira rota de todo carregamento: importada de forma estática,
  // ela viaja no bundle inicial e some um nível da cascata de requisições
  '/': {
    render: () => renderHome(),
  },

  '/contact': {
    preload: () =>
      Promise.all([
        import('../pages/contact'),
        import('../pages/controllers/contact.controller'),
      ]),
    render: async () => {
      const { renderContact } = await import('../pages/contact');
      return renderContact();
    },
    onMount: async (root) => {
      const { bindContactForm } = await import(
        '../pages/controllers/contact.controller'
      );
      bindContactForm(root);
    },
  },

  '/projects': {
    preload: () =>
      Promise.all([
        import('../pages/projects'),
        import('../pages/controllers/projects.controller'),
      ]),
    render: async () => {
      const { renderProjects } = await import('../pages/projects');
      return renderProjects();
    },
    onMount: async (root) => {
      const { bindProjects } = await import(
        '../pages/controllers/projects.controller'
      );
      bindProjects(root);
    },
    onUnmount: () => {
      void import('../pages/controllers/projects.controller').then(
        ({ unbindProjects }) => unbindProjects()
      );
    },
  },
};

export const fallbackRoute = '/';
