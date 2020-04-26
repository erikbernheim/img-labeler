import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';
import { CanvasMapComponent } from './canvas-map/canvas-map.component';
import { Ng2PanZoomModule } from 'ng2-panzoom';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GitComponent } from './git/git.component';
import { HttpClientModule } from '@angular/common/http';
import { GitManageComponent } from './git-manage/git-manage.component';



@NgModule({
  declarations: [
    AppComponent,
    DrawingCanvasComponent,
    CanvasMapComponent,
    GitComponent,
    GitManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2PanZoomModule,
    NgbModule,
    NgxUiLoaderModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
