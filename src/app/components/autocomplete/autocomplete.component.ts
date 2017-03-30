import { Component, OnInit, ElementRef, Directive, Input } from '@angular/core';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  host: {
    '(document:click)': 'handleClick($event)',
  },
})

@Directive({
  selector: '[idList]'
})
export class AutocompleteComponent implements OnInit {

    @Input() idList: string;

    public query = '';
    public elements = [];
    public filteredList = [];
    public elementRef;

    constructor(myElement: ElementRef) {
      this.elementRef = myElement;
    }

  ngOnInit() {
      //TODO Falta hacer la diferenciacion para las diferentes listas
    if (this.idList == "0"){
      this.elements = ["Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
        "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
        "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
        "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
        "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
        "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
        "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
        "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];
    }

  }

  filter() {
    if (this.query !== ""){
      this.filteredList = this.elements.filter(function(el){
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    }else{
      this.filteredList = [];
    }
  }

  select(item){
    this.query = item;
    this.filteredList = [];
    console.log(this.idList);
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.filteredList = [];
    }
  }
}
