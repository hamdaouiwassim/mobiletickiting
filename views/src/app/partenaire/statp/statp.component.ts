import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-statp',
  templateUrl: './statp.component.html',
  styleUrls: ['./statp.component.css']
})
export class StatpComponent implements OnInit {
  //labels:any;
  events : any =[];
reservations : any=[];
  constructor() { }

  ngOnInit(): void {
    this.getAllReservations()
    this.getCurrentPartenaire()
    this.getEvents()
    this.getEventsStat()
  }

  barChartOptions: ChartOptions = {
    responsive: true,
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Meilleur evenement' }
  ];

 
  getCurrentPartenaire(){

    const id = localStorage.getItem('idUser')
    axios.get('http://127.0.0.1:8000/user/partenaire/'+id).then(res => {
      localStorage.setItem('partenaire',res.data[0]._id) 

 
    }).catch(err=>{

    })
  }
  getAllReservations(){
    axios.get('http://127.0.0.1:8000/partenaire/reservations').then(res=>{
      this.reservations = res.data

    }).catch(err=>{
      
    })
  }
  getEvents(){

   
    //console.log(this.part)
    axios.get('http://127.0.0.1:8000/partenaire/'+localStorage.getItem('partenaire')+'/events').then(res=>{
            this.events = res.data;
        }).catch(err=>{
          console.log(err);
        })
  
  }
 getEventsStat(){
      
        const that = this
        setTimeout(function(){
          console.log(that.events)
          console.log(that.reservations)
          let labels = []
          let data = []
          let eventRes = 0
     
          that.events.forEach(e => {
            eventRes = 0
              that.reservations.forEach(r => {
                if (e._id == r.event){
                  
                  eventRes +=r.nbrtickets
  
                }
              });
              if (eventRes>0){
                data.push(eventRes)
                labels.push(e.nom)
              }
            
          });
          that.barChartLabels = labels
          that.barChartData[0].data = data
          // console.log(labels);
          // console.log(data);
        },1000)
       
  }

}
