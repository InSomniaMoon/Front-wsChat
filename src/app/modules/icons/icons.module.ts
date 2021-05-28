import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { ArrowLeft, Info } from "angular-feather/icons";

const icons = {
  ArrowLeft,
  Info
}

@NgModule({
  declarations: [],
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
