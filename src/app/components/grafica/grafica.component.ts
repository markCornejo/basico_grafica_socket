import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'VEntas' },
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit(): void {

    this.getData();
    this.escucharSocket();

  }

  getData() {

    this.http.get('http://localhost:5000/grafica').subscribe( (data: any) => {
      this.lineChartData = data;
    });

  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica').subscribe( (data: any) => {
      console.log('socket', data);
      this.lineChartData[0].data = data[0].data;
    });
  }

}
