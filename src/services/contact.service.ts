export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContact(data: ContactFormData) {
  if (!data.email.includes('@')) {
    throw new Error('Email inválido');
  }

  // o SDK do Firebase (~430 kB) entra só no envio: importar aqui em vez de no
  // topo tira esse peso da abertura da página de contato
  const { saveContact } = await import('../db/firebase');

  return saveContact(data);
}
