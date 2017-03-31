import {Component, OnInit, ElementRef, Directive, Input, Output, EventEmitter} from '@angular/core';
import {AutocompleteList} from "../../models/autocompleteListRoutes";

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  host: {
    '(document:click)': 'handleClick($event)',
  },
})

// TODO Mejorar
@Directive({
  selector: '[idList]'
})
export class AutocompleteComponent implements OnInit {

    @Input() idList: string;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();


    public query = '';
    public elements = {};
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
      this.filteredList = [];
      for (let key in this.elements){
        let value = this.elements[key];

        if (value.toLowerCase().indexOf(this.query.toLowerCase()) > -1){
          this.filteredList.push(key);
        }
      }
    }else{
      this.filteredList = [];
    }
  }

  select(key){
    this.query = this.elements[key];
    this.filteredList = [];

    // Envia la seleccion al componente padre
    this.notify.emit(key);
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

      var exist = false;

      // Comprueba que exista
      for(let key in this.elements) {
        if (this.query == this.elements[key]){
          exist = true;
        }
      }
      if (!exist){
        // Si no existe en la lista envia que se borre en el padre
        this.notify.emit("");
        this.query = "";
      }else{
        // Si si que existe envia la confirmacion de que existe
        this.notify.emit(this.query);
      }
    }
  }
}
