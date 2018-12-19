import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ]),
  ]
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
