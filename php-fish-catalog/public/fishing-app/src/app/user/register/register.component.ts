import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

export class Credentials {
  username!: string;
  name!: string;
  password!: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hasSuccess: boolean = false;
  hasError: boolean = false;
  user!: Credentials;
  pass_repeat!: string;
  constructor(private userService: UserDataService) {
    this.user = new Credentials();
  }

  ngOnInit(): void {}

  save() {
    console.log(this.user);
    this.userService.registerUser(this.user).subscribe({
      next: (addedUser) => {
        this.hasSuccess = true;
        this.hasError = false;
        console.log(addedUser);
      },
      error: (err) => {
        this.hasSuccess = false;
        this.hasError = true;
        console.log(err);
      },
      complete: () => {},
    });
  }
}
