import { Component, OnInit,Input ,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {
  @Input() displayStyle = "none";
  @Input() name: string;
  @Input() phone_number: string;
  @Input() address: string;
  @Input() country: string;
  @Input() state: string;
  @Input() gender: string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  message="";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
    this.messageEvent.emit(this.displayStyle)
  }
 

}
