import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FishDataService } from 'src/app/services/fish-data.service';
import { MessageService } from 'src/app/services/message.service';
import { InfoMessage } from 'src/app/user/login/login.component';
import { environment } from 'src/environments/environment';
import { Distribution, Fish } from '../fishes/fishes.component';

@Component({
  selector: 'app-edit-fish',
  templateUrl: './edit-fish.component.html',
  styleUrls: ['./edit-fish.component.css'],
})
export class EditFishComponent implements OnInit {
  fish!: Fish;

  constructor(
    private fishService: FishDataService,
    private route: ActivatedRoute,
    private _msg: MessageService
  ) {}

  ngOnInit(): void {
    const fishId = this.route.snapshot.params[environment.FISH_ID];

    setTimeout(() => {
      this.fishService.getFish(fishId).subscribe({
        next: (fish) => {
          this.fish = fish;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('getFish completed');
        },
      });
    }, 0);
  }

  save() {
    this.fishService.updateFish(this.fish).subscribe({
      next: (updatedFish) => {
        this._msg.infoMessage = new InfoMessage(
          true,
          environment.FISH_UPDATED_SUCCESS
        );
        console.log('Updated', updatedFish);
      },
      error: (err) => {
        this._msg.infoMessage = new InfoMessage(
          false,
          environment.FISH_UPDATE_FAILED
        );
        console.log(err);
      },
      complete: () => {
        console.log('Updated fish');
      },
    });
  }

  removeDist(index: number) {
    this.fish.distribution.splice(index, 1);
  }
}
