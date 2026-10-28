import { inject, Service, signal } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { Auth } from './auth';

@Service()
export class ContactsService {

  authService = inject(Auth);

  readonly contactList = signal<Contact[]>([]);

  // Trae los contactos del usuario logueado desde el back
  async getContacts(): Promise<Contact[]> {
    const res = await fetch("http://localhost:5000/api/contacts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if (!res.ok) return [];
    const contactos: Contact[] = await res.json();
    this.contactList.set(contactos);
    return contactos;
  }

  // Por ahora agregar y eliminar siguen trabajando sobre la lista local (todavía no llaman al back)
  agregarContacto(nuevoContacto: Contact) {
    const nuevoId = Date.now();
    this.contactList.update(lista => [...lista, {
      id: nuevoId,
      firstName: nuevoContacto.firstName,
      lastName: nuevoContacto.lastName,
      email: nuevoContacto.email,
      number: nuevoContacto.number,
      image: 'https://ui-avatars.com/api/?name=' + nuevoContacto.firstName + '+' + nuevoContacto.lastName + '&background=BACBD8&color=161F36'
    }]);
    return nuevoId;
  }

  // Trae un contacto puntual del back a partir de su id
  async getContactById(id: number): Promise<Contact | undefined> {
    const res = await fetch("http://localhost:5000/api/contacts/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    });
    if (!res.ok || res.status === 204) return undefined;
    const contacto: Contact = await res.json();
    return contacto;
  }

  deleteContact(id: number) {
    this.contactList.update(lista => lista.filter(contacto => contacto.id !== id));
  }
}
