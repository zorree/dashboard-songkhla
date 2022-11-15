import { Component, OnInit } from '@angular/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private androidFullScreen: AndroidFullScreen
  ) { }

  ngOnInit(): void {
    this.androidFullScreen.leanMode()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));
  }
}
