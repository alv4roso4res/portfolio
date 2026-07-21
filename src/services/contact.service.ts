import { saveContact } from '../db/firebase';

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

  return saveContact(data);
}
