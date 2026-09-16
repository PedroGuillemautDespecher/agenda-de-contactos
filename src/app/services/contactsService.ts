import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contactList: Contact[] = [
    {
      id: 1,
      nombre: 'Maria',
      apellido: 'Lopez',
      email: 'maria.lopez@mail.com',
      numeroTelefono: '+54 351 555-0101',
      imgUrl: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=BACBD8&color=161F36'
    },
    {
      id: 2,
      nombre: 'Pedro',
      apellido: 'Gomez',
      email: 'pedro.gomez@mail.com',
      numeroTelefono: '+54 351 555-0102',
      imgUrl: 'https://ui-avatars.com/api/?name=Pedro+Gomez&background=BACBD8&color=161F36'
    },
    {
      id: 3,
      nombre: 'Sofia',
      apellido: 'Fernandez',
      email: 'sofia.fernandez@mail.com',
      numeroTelefono: '+54 351 555-0103',
      imgUrl: 'https://ui-avatars.com/api/?name=Sofia+Fernandez&background=BACBD8&color=161F36'
    },
    {
      id: 4,
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan.perez@mail.com',
      numeroTelefono: '+54 351 555-0104',
      imgUrl: 'https://ui-avatars.com/api/?name=Juan+Perez&background=BACBD8&color=161F36'
    }
  ];

  agregarContacto() {
    this.contactList.push({
      id: this.contactList.length + 1,
      nombre: 'Contacto',
      apellido: 'Nuevo',
      email: 'sin-email@mail.com',
      numeroTelefono: 'Sin numero',
      imgUrl: 'https://ui-avatars.com/api/?name=Contacto+Nuevo&background=BACBD8&color=161F36'
    });
  }

  deleteContact(id: number) {
    this.contactList = this.contactList.filter(contacto => contacto.id !== id);
  }
}
