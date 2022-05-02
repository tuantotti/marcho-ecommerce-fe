import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/core/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

NgModule({
  declarations: [],
  imports: [MaterialModule],
  exports: [HeaderComponent, FooterComponent],
});
export class ShareModule {}
