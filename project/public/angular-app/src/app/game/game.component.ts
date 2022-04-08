import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../game-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  game!: Game;
  constructor(
    private gamesService: GamesDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.params['gameId'];
    this.gamesService.getGame(gameId).subscribe((game) => {
      this.game = game;
    });
  }

  deleteGame() {
    this.gamesService.deleteGame(this.game._id).subscribe((result) => {
      if (result['deletedCount'] == 1) {
        this.router.navigate(['/games']);
      } else {
        alert("Couldn't delete it");
        console.log("Couldn't delete it");
      }
    });
  }
}
