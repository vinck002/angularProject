import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
@Output() sidenavClose = new EventEmitter();
  constructor() { }
rol:number = 1;

  ngOnInit(): void {
  }
 
 public onsidenavClose = () =>{
  this.sidenavClose.emit();
 };
}
