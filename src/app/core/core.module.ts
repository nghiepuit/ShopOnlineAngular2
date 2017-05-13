import { NgModule } from '@angular/core';

// Pipe
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    SortPipe
  ],
  imports: [
    
  ],
  providers: [],
  bootstrap: [],
  exports: [SortPipe]
})
export class CoreModule { }
