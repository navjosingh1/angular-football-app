import { Component } from '@angular/core';
import { GeneralConstant } from '../assets/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = GeneralConstant.FOOTBALL_TITLE;

  /**
   * on page reload, it will clear local storage data
   */
  constructor() {   
    
    window.onbeforeunload = function() {
      localStorage.clear();
      return '';
    };
  }
}
