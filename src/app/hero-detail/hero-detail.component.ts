import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  powers = ['Really Smart', 'Flight', 'Electromagnetic', 'Super Flexible', 'Super Hot', 'Weather Changer', 'Fire Breath', 'Controls Wind'];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
