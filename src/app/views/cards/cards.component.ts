import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  data: any = [];
  isLoading = true;
  
  constructor() {}

  onGetData(data) {
    if(data)
      this.isLoading = false;
      this.data = data.filter(item => item.supertype == "Pokémon");
  }    

  ngOnInit() {
  }  
}
