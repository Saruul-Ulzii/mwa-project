import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Distribution, Fish } from '../fishes/fishes.component';
import { InfoMessage } from '../../user/login/login.component';
import { FishDataService } from 'src/app/services/fish-data.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-fish',
  templateUrl: './add-fish.component.html',
  styleUrls: ['./add-fish.component.css'],
})
export class AddFishComponent implements OnInit {
  fish: Fish = new Fish();
  constructor(
    private fishService: FishDataService,
    private router: Router,
    private _msg: MessageService
  ) {}

  ngOnInit(): void {}

  addDist() {
    this.fish.distribution.push(new Distribution());
  }

  removeDist(index: number) {
    this.fish.distribution.splice(index, 1);
  }

  add() {
    this.fishService.addFish(this.fish).subscribe({
      next: (fish) => {
        console.log('fish added', fish);

        this._msg.infoMessage = new InfoMessage(
          true,
          environment.FISH_ADDED_SUCCESS
        );
        this.router.navigate([environment.PATH_FISHES]);
      },
      error: (err) => {
        this._msg.infoMessage = new InfoMessage(
          false,
          environment.FISH_ADD_FAILED
        );
        console.error('err', err);
      },
      complete: () => {
        console.log('completed fish added');
      },
    });
  }
}
