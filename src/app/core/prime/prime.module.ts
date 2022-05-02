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
];

@NgModule({
  imports: [PrimeComponents],
  exports: [PrimeComponents],
})
export class PrimeModule {}
