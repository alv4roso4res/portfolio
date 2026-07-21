import { submitContact } from "../../services/contact.service";
import { splitLetters } from "../../scripts/splitLetters";

export function bindContactForm(root: HTMLElement) {
  const form = root.querySelector('#contactForm') as HTMLFormElement;
  if (!form) return;

  const button = form.querySelector('.contact-submit') as HTMLButtonElement;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!button) return;

    const formData = new FormData(form);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    const originalText = 'enviar';
    button.disabled = true;
    button.textContent = 'enviando...';
    splitLetters('.contact-submit');

    try {
      await submitContact(data);
      button.textContent = 'enviado com sucesso';
      splitLetters('.contact-submit');
      form.reset();
    } catch {
      button.textContent = 'erro ao enviar';
      splitLetters('.contact-submit');
    } finally {
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        splitLetters('.contact-submit');
      }, 3000);
    }
  });
}
