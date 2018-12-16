import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private todoService: TodoService, public authService: AuthService) { 

  }

  onLogout() {
    this.authService.logout();
  } 
}
