import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    login: new FormControl('Vasya', [Validators.required]),
    password: new FormControl('Cool', [Validators.required])
  })
  constructor(private authService: AuthService) { }

  submit() {
    this.authService.login(this.form.value);
  }

}
