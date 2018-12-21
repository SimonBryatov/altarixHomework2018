import { SwUpdate } from '@angular/service-worker';
import { Component , OnInit} from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'angular-ToDoApp';
public ngOnInit():void {
        if (this.null.isEnabled) {
            this.null.available.subscribe((evt) => {
                console.log('service worker updated');
            });
    
            this.null.checkForUpdate().then(() => {
                // noop
            }).catch((err) => {
                console.error('error when checking for update', err);
            });
        }}


 constructor(private swUpdate: SwUpdate) {}
}
