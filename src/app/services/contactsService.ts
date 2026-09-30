import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contactList: Contact[] = [
    {
      id: 1,
      firstName: 'Maria',
      lastName: 'Lopez',
      email: 'maria.lopez@mail.com',
      number: '+54 351 555-0101',
      image: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=BACBD8&color=161F36'
    },
    {
      id: 2,
      firstName: 'Pedro',
      lastName: 'Gomez',
      email: 'pedro.gomez@mail.com',
      number: '+54 351 555-0102',
      image: 'https://ui-avatars.com/api/?name=Pedro+Gomez&background=BACBD8&color=161F36'
    },
    {
      id: 3,
      firstName: 'Sofia',
      lastName: 'Fernandez',
      email: 'sofia.fernandez@mail.com',
      number: '+54 351 555-0103',
      image: 'https://ui-avatars.com/api/?name=Sofia+Fernandez&background=BACBD8&color=161F36'
    },
    {
      id: 4,
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juan.perez@mail.com',
      number: '+54 351 555-0104',
      image: 'https://ui-avatars.com/api/?name=Juan+Perez&background=BACBD8&color=161F36'
    }
  ];

  agregarContacto(nuevoContacto: Contact) {
    const nuevoId = Date.now();
    this.contactList.push({
      id: nuevoId,
      firstName: nuevoContacto.firstName,
      lastName: nuevoContacto.lastName,
      email: nuevoContacto.email,
      number: nuevoContacto.number,
      image: 'https://ui-avatars.com/api/?name=' + nuevoContacto.firstName + '+' + nuevoContacto.lastName + '&background=BACBD8&color=161F36'
    });
    return nuevoId;
  }

  /// Busca un contacto desde un ID
  getContactById(id: number) {
    const contactoEncontrado = this.contactList.find(contacto => contacto.id === id);
    return contactoEncontrado;
  }

  deleteContact(id: number) {
    this.contactList = this.contactList.filter(contacto => contacto.id !== id);
  }
}
