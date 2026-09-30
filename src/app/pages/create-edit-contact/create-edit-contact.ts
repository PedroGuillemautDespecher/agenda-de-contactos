import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { ContactsService } from '../../services/contactsService';
import { Contact } from '../../interfaces/contact';
import Swal from 'sweetalert2';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-create-edit-contact',
  styleUrl: './create-edit-contact.scss',
  templateUrl: './create-edit-contact.html',
})
export class CreateEditContact {

  contactsService = inject(ContactsService);
  router = inject(Router);

  newContactModel = signal<Contact>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    image: ''
  });

  formCreateContact = form(this.newContactModel);

  onSubmit(event: Event) {
    event.preventDefault();
    const idContactoCreado = this.contactsService.agregarContacto(this.newContactModel());

    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "success",
      title: "Contacto creado"
    });

    this.router.navigate(['/contacts', idContactoCreado]);
  }
}
