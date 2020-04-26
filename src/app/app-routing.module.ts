import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GitComponent } from './git/git.component';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';

const routes: Routes = [
  {path: '', component: DrawingCanvasComponent},
  {path: 'authresponse', component: GitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
