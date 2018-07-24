import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {Router} from "@angular/router";
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  title: string = 'miniLeetCode'
  profile: any;
  username: String;
  searchBox: FormControl;
  subscription: Subscription;
  constructor(@Inject("AuthService") private AuthService,
  @Inject("SearchInputService") private SearchInputService,
  private router: Router) {
    // this.AuthService.userProfile.subscribe(
    //   profile => {
    //     this.profile = profile;
    //   }
    // );
    this.searchBox = new FormControl();
    // this.subscription = this.searchBox.valueChanges.subscribe(
    //   name => this.SearchInputService.change(name)
    // );
  }

  ngOnInit() {
    this.AuthService.userProfile.subscribe(
      profile => {
        this.profile = profile;
      }
    );
    this.searchBox = new FormControl();
    this.subscription = this.searchBox.valueChanges.subscribe(
      name => this.SearchInputService.set(name)
    );
  }

  ngOnDestroy(){
    this.subscription .unsubscribe();
  }

  search(): void {
    this.router.navigate(['/problems']);
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