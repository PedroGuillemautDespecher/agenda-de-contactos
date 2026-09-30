import { Service } from '@angular/core';
import { LoginForm } from '../interfaces/login';

@Service()
export class Auth {

  login(loginData: LoginForm) {

    fetch("http://localhost:5000/api/authentication/authenticate", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password
      })
    })

  }

  register() {

  }

}
