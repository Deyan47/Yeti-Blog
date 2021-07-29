import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLogged = true;

  public userPic = "https://img.pixers.pics/pho_wat(s3:700/FO/43/95/47/18/700_FO43954718_9b0e8c7a523456b309618f7614ae3d51.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/wall-murals-cute-blue-yeti.jpg.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}
