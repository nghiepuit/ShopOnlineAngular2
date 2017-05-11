import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// Component
import { AppComponent } from './app.component';
// Router
import { appRoutes } from './app.routes';
// Guard
import { AuthGuard } from './core/guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
