import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FishDataService } from '../fish-data.service';
import { Distribution, Fish } from '../fishes/fishes.component';

@Component({
  selector: 'app-edit-fish',
  templateUrl: './edit-fish.component.html',
  styleUrls: ['./edit-fish.component.css'],
})
export class EditFishComponent implements OnInit {
  fish!: Fish;

  constructor(
    private fb: FormBuilder,
    private fishService: FishDataService,
    private route: ActivatedRoute
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
    console.log('fish values', this.fish);

    this.fishService.updateFish(this.fish).subscribe({
      next: (updatedFish) => {
        console.log('Updated', updatedFish);
      },
      error: (err) => {
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
