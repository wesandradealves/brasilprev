import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() id: string;
  @Output() getData: EventEmitter<any> = new EventEmitter();
  @Output() startSpinner: EventEmitter<any> = new EventEmitter();

  page = 1;
  timeout = null;
  pages = [];
  data: any = [];
  filterForm = new FormGroup({
    page: new FormControl(),
    s: new FormControl()
  })  

  constructor(private cardsService: CardsService, 
    private route:ActivatedRoute,
    private _location: Location,
    private router: Router) {}

    ngOnInit() {
      let q = this.route.snapshot.params.q;

      if(!this.id && !q) {
        this.getCards(this.page);
      } else if(q) {
        this.getCardsByQuery(q);
      }
      
      var $self = this;

      this.filterForm.get("page").valueChanges.subscribe(selectedValue => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          $self.startSpinner.emit(true);  
          $self.getCards(selectedValue);
        }, 1000);  
      });

      this.filterForm.get("s").valueChanges.subscribe(selectedValue => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          $self.startSpinner.emit(true);
          $self.getCardsByQuery(selectedValue);
        }, 1000);  
      });      
    }
  
    getCards(page) {
      this.cardsService.getCards(page)
      .subscribe((response) => {
        if(response.data) {
          let pages = Math.round(response.totalCount/response.pageSize);
          this.pages = Array(pages).fill(pages).map((x, i) => i+1);          
          this.data = response.data;
          this.getData.emit(this.data);       
        }
      });
    }  
  
    getCardsByQuery(s) {
      if(this.id) {
        this.router.navigate([`/cards/${s}`], { queryParams: { q: s } });
      } else {
        window.history.pushState({}, '', `/cards/${s}`);     
      }

      this.cardsService.getCardsByQuery(s)
      .subscribe((response) => {
        if(response.data) {
          let pages = Math.round(response.totalCount/response.pageSize);
          this.pages = Array(pages).fill(pages).map((x, i) => i+1);          
          this.data = response.data;
          this.getData.emit(response.data);
        }
      });
    }   
    
    goBack() {
      // this._location.back();
      this.router.navigate([`/cards`]); 
    }

}
