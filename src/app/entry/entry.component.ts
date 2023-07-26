import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entry } from '../entry';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      {{entry.date}}
      {{entry.efficiency}}
    </p>

  `,
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  @Input() entry!: Entry;
}
