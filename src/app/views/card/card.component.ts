import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  card: any = []; 
  id = this.route.snapshot.params.id;
  isLoading = true;

  constructor(private cardsService: CardsService, 
    private route:ActivatedRoute,
    private _location: Location) {}

  ngOnInit() {
    this.getCardsById(this.id);
  }

  getCardsById(id) {
    this.cardsService.getCardsById(id)
    .subscribe((response) => {
      if(response.data)
        this.isLoading = false;
        this.card = response.data; 
        console.log(this.card)
    });
  }  
}
