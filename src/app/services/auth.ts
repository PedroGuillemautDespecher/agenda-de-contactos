import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../interfaces/login';
import { RegisterData } from '../interfaces/register';

@Service()
export class Auth {

  token = localStorage.getItem("token") || "";
  router = inject(Router);

  async login(loginData: LoginForm): Promise<boolean> {

    const res = await fetch("http://localhost:5000/api/authentication/authenticate", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password
      })
    });

    if (!res.ok) return false;

    const token = await res.text();
    localStorage.setItem("token", token);
    this.token = token;
    return true;
  }

  logout() {
    this.token = "";
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  async register(newUser: RegisterData): Promise<boolean> {

    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password
      })
    });

    return res.ok;
  }

}
