import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName$ = this.authService.userName$;
  isAuthorized$ = this.authService.authStatus$; 
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  } 
}
