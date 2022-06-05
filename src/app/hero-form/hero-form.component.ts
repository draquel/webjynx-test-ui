import { Component } from '@angular/core';

import { Hero } from '../hero';
import {HeroService} from "../hero.service";
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {

  powers = ['Really Smart', 'Flight', 'Electromagnetic', 'Super Flexible', 'Super Hot', 'Weather Changer', 'Fire Breath', 'Controls Wind'];

  model = new Hero();

  submitted = false;

  constructor(private heroService: HeroService) { }

  onSubmit() {
    this.submitted = true;

    this.addHero(this.model);

  }

  addHero(hero: Hero): void{
    this.heroService.addHero(hero)
      .subscribe((response) => {},(error)=>{},()=>{});
  }


  newHero() {
    this.model = new Hero();
  }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
    return form && form.controls.name &&
      form.controls.name.value; // Dr. IQ
  }

  /////////////////////////////

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
