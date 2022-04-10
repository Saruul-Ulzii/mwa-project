import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FishDataService } from '../fish-data.service';
import { Distribution, Fish } from '../fishes/fishes.component';

@Component({
  selector: 'app-add-fish',
  templateUrl: './add-fish.component.html',
  styleUrls: ['./add-fish.component.css'],
})
export class AddFishComponent implements OnInit {
  fish: Fish = new Fish();
  constructor(private fishService: FishDataService, private router: Router) {}

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
        this.router.navigate([environment.PATH_FISHES]);
      },
      error: (err) => {
        console.error('err', err);
      },
      complete: () => {
        console.log('completed fish added');
      },
    });
  }
}
