import { Component, Inject } from '@angular/core';
import { AuthService } from './components/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(@Inject("AuthService") private auth) {
    this.auth.handleAuthentication();
  }
}
