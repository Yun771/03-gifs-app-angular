import { Component, Input, OnInit } from '@angular/core';
import { Gif }                      from "../../interfaces/gifs.interfaces";

@Component({
  selector: 'gifs-card',
  templateUrl: './gifcard.component.html',
  styleUrls: ['./gifcard.component.sass']
})
export class GifcardComponent implements OnInit {

   @Input()
   public gif!: Gif;
  ngOnInit(): void {
    if(!this.gif ) throw  Error('El gif es obligatorio')
  }


}
