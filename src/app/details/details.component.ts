import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-details',
  imports: [MatMenuModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  @Input() name: string = '';
}
