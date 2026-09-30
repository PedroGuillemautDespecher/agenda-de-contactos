import { Component, inject, input, OnInit } from '@angular/core';
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
  contacto: Contact | undefined;
  contactsService = inject(ContactsService);

  ngOnInit(): void {
    this.contacto = this.contactsService.getContactById(Number(this.id()));
  }
}
