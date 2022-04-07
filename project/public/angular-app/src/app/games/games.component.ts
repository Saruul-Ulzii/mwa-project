import { Component, OnInit } from '@angular/core';

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
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games!: Game[];
  constructor(private gamesService: GamesDataService) {}

  ngOnInit(): void {
    this.updateGameList();
  }

  updateGameList() {
    this.gamesService.getGames().subscribe((games) => {
      this.games = games;
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
}
