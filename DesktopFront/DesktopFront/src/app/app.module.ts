import { BrowserModule } from '@angular/platform-browser';
import { ApiClientService } from '../app/services/api-client.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComComponent } from './components/test-com/test-com.component';

@NgModule({
  declarations: [AppComponent, TestComComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [ApiClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
