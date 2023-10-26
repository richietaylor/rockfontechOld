import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
// export class ChartComponent {
//   title= "chart";
// }

/* app.component.ts */

// import { Component } from '@angular/core';
  
// @Component({
//   standalone: true,
//   selector: 'app-root',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css']
// })
export class ChartComponent {
  title= "chart";
  chartOptions = {
    title: {
      text: "Angular Column Chart with Index Labels"
    },
    animationEnabled: true,
    axisY: {
    includeZero: true
    },
    data: [{
    type: "column", //change type to bar, line, area, pie, etc
    //indexLabel: "{y}", //Shows y value on all Data Points
    indexLabelFontColor: "#5A5757",
    dataPoints: [
      { x: 10, y: 71 },
      { x: 20, y: 55 },
      { x: 30, y: 50 },
      { x: 40, y: 65 },
      { x: 50, y: 71 },
      { x: 60, y: 92, indexLabel: "Highest\u2191" },
      { x: 70, y: 68 },
      { x: 80, y: 38, indexLabel: "Lowest\u2193"  },
      { x: 90, y: 54 },
      { x: 100, y: 60 }
    ]
    }]
  }
}                              
