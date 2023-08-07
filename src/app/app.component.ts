import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './table/table.component';
import { EntryComponent } from './entry/entry.component'; 
@Component({
  standalone: true,
  imports: [
    ChartComponent,
    TableComponent,
    EntryComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'Rockfontech';
}
