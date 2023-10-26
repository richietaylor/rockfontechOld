import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from '../entry/entry.component';
import { Entry } from '../entry';
import { ChartComponent } from '../chart/chart.component';
// import { Chart } from '../chart';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, EntryComponent , ChartComponent], //
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  entryList: Entry[] = [
  {
    id: 0,
    date: "12/09/2023",
    efficiency: "99",
  },
  {
    id: 1,
    date: "13/09/2023",
    efficiency: "98",
  },
  {
    id: 2,
    date: "14/09/2023",
    efficiency: "100",
  },
  {
    id: 3,
    date: "15/09/2023",
    efficiency: "98",
  },
  {
    id:4,
    date: "21/09/2023",
    efficiency: "87",
  },


]
}
