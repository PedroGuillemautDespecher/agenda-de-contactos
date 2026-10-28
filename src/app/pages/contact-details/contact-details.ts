import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactsService } from '../../services/contactsService';
import { Contact } from '../../interfaces/contact';

@Component({
  imports: [RouterLink],
  selector: 'app-contact-details',
  styleUrl: './contact-details.scss',
  templateUrl: './contact-details.html',
})
export class ContactDetails implements OnInit {

  id = input.required<string>();
  contacto = signal<Contact | undefined>(undefined);
  cargando = signal(true);
  contactsService = inject(ContactsService);

  async ngOnInit() {
    this.contacto.set(await this.contactsService.getContactById(Number(this.id())));
    this.cargando.set(false);
  }
}
