import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';
import { Ng2PanZoomModule } from 'ng2-panzoom';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GitComponent } from './git/git.component';
import { HttpClientModule } from '@angular/common/http';
import { GitManageComponent } from './git-manage/git-manage.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarColorSelectorComponent } from './toolbar-color-selector/toolbar-color-selector.component';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { LayersComponent } from './layers/layers.component';
import { RevertFromHistoryComponent } from './revert-from-history/revert-from-history.component';
import { TogglePixelationComponent } from './toggle-pixelation/toggle-pixelation.component';



@NgModule({
  declarations: [
    AppComponent,
    DrawingCanvasComponent,
    GitComponent,
    GitManageComponent,
    ToolbarComponent,
    ToolbarColorSelectorComponent,
    ImageSelectorComponent,
    LayersComponent,
    RevertFromHistoryComponent,
    TogglePixelationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2PanZoomModule,
    NgbModule,
    NgxUiLoaderModule,
    HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
