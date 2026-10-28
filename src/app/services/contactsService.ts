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

  // Crea el contacto en el back y lo suma a la lista con el id real que devuelve
  async agregarContacto(nuevoContacto: Contact): Promise<number | undefined> {
    const res = await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + this.authService.token
      },
      body: JSON.stringify({
        firstName: nuevoContacto.firstName,
        lastName: nuevoContacto.lastName,
        email: nuevoContacto.email,
        number: nuevoContacto.number,
        image: nuevoContacto.image || 'https://ui-avatars.com/api/?name=' + nuevoContacto.firstName + '+' + nuevoContacto.lastName + '&background=BACBD8&color=161F36'
      })
    });
    if (!res.ok) return undefined;
    const contactoCreado: Contact = await res.json();
    this.contactList.update(lista => [...lista, contactoCreado]);
    return contactoCreado.id;
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

  // Por ahora eliminar sigue trabajando sobre la lista local (todavía no llama al back)
  deleteContact(id: number) {
    this.contactList.update(lista => lista.filter(contacto => contacto.id !== id));
  }
}
