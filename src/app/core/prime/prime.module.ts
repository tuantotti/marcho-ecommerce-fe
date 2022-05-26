import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ChartModule } from 'primeng/chart';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DataViewModule } from 'primeng/dataview';
import { SliderModule } from 'primeng/slider';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { PaginatorModule } from 'primeng/paginator';
const PrimeComponents = [
  AccordionModule,
  CheckboxModule,
  DropdownModule,
  ButtonModule,
  ToolbarModule,
  SplitButtonModule,
  BadgeModule,
  AvatarModule,
  ChartModule,
  PanelMenuModule,
  DividerModule,
  TableModule,
  ToastModule,
  ConfirmDialogModule,
  DialogModule,
  RatingModule,
  FormsModule,
  FileUploadModule,
  InputTextModule,
  InputNumberModule,
  InputTextareaModule,
  RadioButtonModule,
  DataViewModule,
  DropdownModule,
  SliderModule,
  GalleriaModule,
  CarouselModule,
  PaginatorModule,
];

@NgModule({
  imports: [PrimeComponents],
  exports: [PrimeComponents],
})
export class PrimeModule {}
