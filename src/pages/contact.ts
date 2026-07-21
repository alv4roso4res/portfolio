export function renderContact(): string {
  return `
    <main class="container">
      <section class="content contact-content">
        <h1 class="title shake-text">Contato</h1>

        <p class="intro shake-text">
          Freelance, projetos ou colaborações.
        </p>

        <div class="group contact-group">
          <form class="contact-form" id="contactForm">
            <label class="contact-field">
              <span class="contact-label shake-text">nome:</span>
              <input type="text" name="name" required autocomplete="name" />
            </label>

            <label class="contact-field">
              <span class="contact-label shake-text">email:</span>
              <input type="email" name="email" required autocomplete="email" />
            </label>

            <label class="contact-field">
              <span class="contact-label shake-text">assunto:</span>
              <input type="text" name="subject" required />
            </label>

            <label class="contact-field">
              <span class="contact-label shake-text">mensagem:</span>
              <textarea name="message" rows="3" required></textarea>
            </label>

            <button type="submit" class="contact-submit shake-text">
              enviar
            </button>
          </form>
        </div>

        <a href="/" class="back-link shake-text">voltar</a>
      </section>
    </main>
  `;
}