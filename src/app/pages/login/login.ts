import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { form, FormField, required, email } from '@angular/forms/signals';
import { LoginForm } from '../../interfaces/login';

@Component({
  imports: [RouterLink, FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {

  loginModel = signal<LoginForm>({
    email: '',
    password: ''
  });

  formLogin = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email);
    email(schemaPath.email);
    required(schemaPath.password);
  });

  login(event: Event) {
    event.preventDefault();
  }
}
