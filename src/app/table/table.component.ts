import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from '../entry/entry.component';
import { Entry } from '../entry';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, EntryComponent],
  template: `
    <p>
      table works!
    </p>
    <button class="primary" type="button">Search</button>
    <app-entry *ngFor="let entry of entryList"
    [entry]="entry"></app-entry>
  `,
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
    efficiency: "97",
  },
]
}
