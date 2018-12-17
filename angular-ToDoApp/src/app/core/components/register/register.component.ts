import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = new FormGroup({
    email:  new FormControl('vasya@mail.ru', [Validators.required, Validators.email]), 
    login: new FormControl('Vasya', [Validators.required]),
    password: new FormControl('Cool', [Validators.required])
  })
  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.register(this.form.value);
  }
}
