import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '@app/pipes/truncate.pipe';
import { SafePipe } from '@app/pipes/safe.pipe';
import { KeysPipe } from '@app/pipes/keys.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TruncatePipe,
    SafePipe,
    KeysPipe
  ],
  exports: [
    TruncatePipe,
    SafePipe,
    KeysPipe
  ]
})
export class PipesModule { }
