import { Component } from '@angular/core';
import { trigger, style, state, transition, animate, query } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
  animations: [
    trigger('fadeInOut', [
      transition('* => *', [
        query(
          ':enter',
          [style({ opacity: 0 })],
          {optional: true}
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
          {optional: true}
        )
      ])
    ])
  ]
})
export class AppComponent {
  title = 'angular-ToDoApp';
}
