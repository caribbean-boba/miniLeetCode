import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  username: String;
  email: String;

  constructor(@Inject("AuthService") private AuthService) {
    this.AuthService.userProfile.subscribe(
      profile => {
        this.profile = profile;
        if (this.AuthService.isAuthenticated()) {
          this.profile = this.profile;
          this.username = this.profile.nickname;
          this.email = this.profile.name;
        }
      }
    );
  }

  ngOnInit() {
    // if (this.AuthService.userProfile) {
    //   this.profile = this.AuthService.userProfile;
    // } else {
    //   this.AuthService.getProfile((err, profile) => {
    //     this.profile = profile;
    //   });
    // }
  }
}
