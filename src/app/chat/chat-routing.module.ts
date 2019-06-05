import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatDrawerComponent} from './chat-drawer.component';

const routes: Routes = [
  {path: '', component: ChatDrawerComponent},
  {path: ':id', component: ChatDrawerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
