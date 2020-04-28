import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message = "Error";
  @Output() close = new EventEmitter; 
  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.close.emit();
  }
}
