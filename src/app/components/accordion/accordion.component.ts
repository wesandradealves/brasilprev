import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() data: any;
  
  opened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickEvent(){
    this.opened = !this.opened;       
  }  

}
