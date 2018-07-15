import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  title: string = 'miniLeetCode'
  profile: any;
  username: String;
  constructor(@Inject("AuthService") private AuthService) {
    this.AuthService.userProfile.subscribe(
      profile => {
        this.profile = profile;
      }
    );
  }

  ngOnInit() {
  }

  login():void {
    this.AuthService.login();
  }

  logout():void {
    this.AuthService.logout();
  }

  isAuthenticated():boolean {
    return this.AuthService.isAuthenticated();
  }
}