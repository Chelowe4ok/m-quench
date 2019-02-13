import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { materialModules } from './material/material';



@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  declarations: [
  ],
  exports: [...materialModules]
})
export class ThemeModule { }
