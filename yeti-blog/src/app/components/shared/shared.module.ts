import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from '../../app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from './alert/alert.component';
import { DateTimeFormatterPipe } from './pipes/date-time-formatter.pipe';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    AlertComponent,
    DateTimeFormatterPipe,
    ShortenTextPipe,
  ],
  imports: [CommonModule, AppRoutingModule, MatProgressSpinnerModule],
  exports: [HeaderComponent, FooterComponent, AlertComponent,DateTimeFormatterPipe,ShortenTextPipe],
})
export class SharedModule {}