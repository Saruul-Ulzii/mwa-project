import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  onHome(){
    console.log('home');
    
    this._router.navigate([""])
  }

  onGames(){
    console.log('games');
    
    this._router.navigate(["games"])
  }
}
