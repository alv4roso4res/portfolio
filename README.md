### Portfólio

Repositório do meu portfólio pessoal, desenvolvido com Vite + TypeScript e estilização própria mobile‑first. O site traz breve apresentação, links profissionais, alguns projetos e atalho para o currículo.

### Stack
- Vite 7
- TypeScript 5
- Firebase (Firestore para contatos)
- CSS3 (Mobile‑first)

### Estrutura
```
.
├─ public/           # Arquivos estáticos (PDFs, Favicon)
├─ src/
│  ├─ app/           # Núcleo da aplicação (Router, Routes)
│  ├─ css/           # Estilos modulares
│  ├─ db/            # Configuração e integração com Firebase
│  ├─ pages/          # Componentes de página (HTML/JS)
│  │  └─ controllers/ # Lógica de interação das páginas
│  ├─ scripts/       # Utilitários (Animações, Ícones)
│  ├─ services/      # Camada de serviços (Regras de negócio)
│  └─ main.ts        # Ponto de entrada (Bootstrap)
├─ index.html
├─ package.json
└─ README.md
```

### Configuração
Para o funcionamento do formulário de contato, é necessário criar um arquivo `.env` na raiz do projeto com as seguintes chaves do Firebase:

```env
VITE_FIREBASE_API_KEY=sua_key
VITE_FIREBASE_AUTH_DOMAIN=seu_dominio
VITE_FIREBASE_PROJECT_ID=seu_id
VITE_FIREBASE_STORAGE_BUCKET=seu_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_id
VITE_FIREBASE_APP_ID=seu_id
```

### Como Rodar Localmente
Pré‑requisitos: Node.js LTS (18+ recomendado) e pnpm/npm/yarn.

1. Instalar dependências:
```
npm install
```
2. Ambiente de desenvolvimento (hot reload):
```
npm run dev
```
3. Build de produção:
```
npm run build
```
4. Preview do build (servidor local):
```
npm run preview
```

Uso:
```
<h1 class="title shake-text">Alvaro | Web Developer</h1>
```

### Acessibilidade e SEO
- Metatags completas em `index.html` (description, keywords, OG/Twitter, canonical, author).
- Ícones SVG recebem `role="img"` e `aria-label` na origem (ver `src/icons.ts`).
- Links externos abrem em nova aba com `rel="noopener noreferrer"`.

### Notas de Arquitetura
- **Roteamento Customizado**: A aplicação utiliza um sistema de rotas próprio (`src/app/router.ts`) que gerencia a troca de conteúdo no elemento `#app` sem recarregar a página.
- **Páginas Dinâmicas**: Cada página é uma função que retorna HTML, localizada em `src/pages/`.
- **Separação de Preocupações**: A lógica de interação com o DOM é isolada em controladores (`src/pages/controllers/`), enquanto as regras de negócio e persistência ficam em `services/` e `db/`.
- **Animações**: Utiliza um sistema de "shake" e animação de letras via `src/scripts/splitLetters.ts`, permitindo efeitos dinâmicos no texto.
- **Estilização**: O import de arquivos CSS é feito de forma modular e incluído no build final pelo Vite.

