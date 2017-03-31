import { Component, OnInit, ElementRef, Directive, Input } from '@angular/core';
import {AutocompleteList} from "../../models/autocompleteListRoutes";

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
      // Recupera la lista de elementos donde se buscara al escribir
      this.elements = AutocompleteList.getList(this.idList);
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
