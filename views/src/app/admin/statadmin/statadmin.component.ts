import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ChartDataSets , ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-statadmin',
  templateUrl: './statadmin.component.html',
  styleUrls: ['./statadmin.component.css']
})
export class StatadminComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Meilleur evenement' },
  ];
  public lineChartLabels: Label[] = ['event 1', 'event 2', 'event 3', 'event 4', 'event 5', 'event 6', 'event 7'];
  public lineChartOptions: ChartOptions = {
    responsive: true, scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  partenaires : any = [];
  events: any =[];
  reservations : any = [];
  constructor() { }

  ngOnInit(): void {
    this.getClients()
  }

  getClients(){
    axios.get('http://127.0.0.1:8000/user/partenaires').then(res=>{

      this.partenaires = res.data;
      }).catch(err=>{

      })
}

getPartenaireStat(p){
  this.getCurrentPartenaire(p._id)
  this.getAllReservations()
  this.getEvents(p._id)
  this.getEventsStat()
  //this.
}

getCurrentPartenaire(id){

  //const id = localStorage.getItem('idUser')
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
getEvents(id){

 
  //console.log(this.part)
  axios.get('http://127.0.0.1:8000/partenaire/'+id+'/events').then(res=>{
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
        that.lineChartLabels = labels
        that.lineChartData[0].data = data
        // console.log(labels);
        // console.log(data);
      },1000)
     
}



}
