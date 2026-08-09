
export type Route = {
  render: () => Promise<string> | string;
  onMount?: (root: HTMLElement) => void | Promise<void>;
  onUnmount?: () => void;
};

export const routes: Record<string, Route> = {
  '/': {
    render: async () => {
      const { renderHome } = await import('../pages/home');
      return renderHome();
    },
  },

  '/contact': {
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
