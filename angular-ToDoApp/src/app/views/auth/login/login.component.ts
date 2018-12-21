import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/core/services/auth.service';

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
