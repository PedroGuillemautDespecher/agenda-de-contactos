import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, required, email, minLength, validate } from '@angular/forms/signals';
import { RegisterData } from '../../interfaces/register';
import { Auth } from '../../services/auth';

@Component({
  imports: [RouterLink, FormField],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {

  authService = inject(Auth);
  router = inject(Router);

  registerModel = signal<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  mensajeError = signal('');

  formRegister = form(this.registerModel, (schemaPath) => {
    required(schemaPath.firstName);
    required(schemaPath.lastName);
    required(schemaPath.email);
    email(schemaPath.email);
    required(schemaPath.password);
    minLength(schemaPath.password, 8);
    validate(schemaPath.confirmPassword, ({ value }) => {
      if (value() !== this.registerModel().password) {
        return { kind: 'passwordsDistintas', message: 'Las contraseñas no coinciden' };
      }
      return null;
    });
  });

  async register(event: Event) {
    event.preventDefault();
    this.mensajeError.set('');

    const result = await this.authService.register(this.registerModel());
    if (result) {
      this.router.navigate(["/login"]);
    } else {
      this.mensajeError.set('No se pudo crear la cuenta. Revisá los datos o probá con otro correo.');
    }
  }
}
