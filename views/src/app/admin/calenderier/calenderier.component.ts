import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import axios from 'axios';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calenderier',
  templateUrl: './calenderier.component.html',
  styleUrls: ['./calenderier.component.css']
})
export class CalenderierComponent implements OnInit {
 

 constructor() { }
  eventsData :any = [];
  events :any;
  ngOnInit(): void {
    this.getEvents()
    
    setTimeout(() => {
      this.CalendarData() // transformer les evenements
      this.calendarOptions = {
        initialView: 'dayGridMonth',
       // dateClick: this.onDateClick.bind(this),
        events: this.eventsData
      };
    }, 500);
    
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    //dateClick: this.handleDateClick.bind(this), // bind is important!
    events: []
  };

  // // handleDateClick(arg) {
  // //   alert('date click! ' + arg.dateStr)
  // // }


  



  getEvents() {

    axios.get('http://127.0.0.1:8000/admin/events/active').then(res=>{
      this.events = res.data
      }).catch(err=>{
        console.log(err)
      })
      console.log(this.events);
    
  }

  CalendarData(){
    const datepipe: DatePipe = new DatePipe('en-US')
 //datepipe.transform(yourDate, 'DD-MMM-YYYY HH:mm:ss')
    console.log(this.events)
    this.events.forEach(element => {
      const obj = { title : element.nom  , date : datepipe.transform(element.date, 'yyyy-MM-dd') }
      console.log(obj)
      this.eventsData.push(obj)
      
    });
    console.log(this.eventsData)
    this.calendarOptions.events = this.eventsData // toggle the boolean!
  }



}
