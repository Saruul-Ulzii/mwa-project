import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

import { GamesDataService } from '../game-data.service';

export class Game {
  _id!: string;
  title!: string;
  price!: number;
  year!: number;
  rate!: number;
  minPlayers!: number;
  maxPlayers!: number;
  minAge!: number;
  publisher!: {
    name: string;
    country: string;
    established: number;
    location: {};
  };
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games!: Game[];
  get isLoggedIn() {
    return this._auth.isLoggedIn;
  }
  addGameForm = this.formBuilder.group({
    title: [''],
    price: [''],
    year: [''],
    rate: [''],
    minPlayers: [''],
    maxPlayers: [''],
    minAge: [''],
  });
  constructor(
    private gamesService: GamesDataService,
    private formBuilder: FormBuilder,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.updateGameList();
  }

  updateGameList() {
    this.gamesService.getGames().subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (err) => {
        console.log('Service error ' + err);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  deleteGame(gameId: string) {
    this.gamesService.deleteGame(gameId).subscribe((result) => {
      if (result['deletedCount'] == 1) {
        this.updateGameList();
      } else {
        alert("Couldn't delete it");
        console.log("Couldn't delete it");
      }
    });
  }

  addGame() {
    console.log(this.addGameForm.value);

    this.gamesService.addGame(this.addGameForm.value).subscribe({
      next: (game) => {
        console.log('Created game: ' + game);
        this.updateGameList();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
