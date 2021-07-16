import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eventsc',
  templateUrl: './eventsc.component.html',
  styleUrls: ['./eventsc.component.css']
})
export class EventscComponent implements OnInit {
events : any;
selectedEvent : any
  constructor(private modalService : NgbModal,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getAllActiveEvents()
  }

  serachEvent(event){
    if (event.target.value === ""){

this.getAllActiveEvents()
    }
    axios.get('http://127.0.0.1:8000/user/events/'+event.target.value).then(res=>{
      this.events = res.data
      }).catch(err=>{
        console.log(err)
      })
      //console.log(this.events);

  }

  getAllActiveEvents(){
    axios.get('http://127.0.0.1:8000/admin/events').then(res=>{
      this.events = res.data
      }).catch(err=>{
        console.log(err)
      })
      console.log(this.events);
  }

  open(content,event) {
    this.selectedEvent = event._id
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addReservation(f : NgForm){
        console.log(f.value);
        const data = {
          user : localStorage.getItem('idUser'),
          event : this.selectedEvent,
          nbrtickets : f.controls.nbrtickets.value,
          typeticket : f.controls.typeticket.value, 
        };
        axios.post('http://127.0.0.1:8000/user/reservation/add',data).then(res=>{
                //this.events = res.data
                this.modalService.dismissAll()
                this.toastr.success('Vous avez participee dans un evenement','Notification')
                }).catch(err=>{
                  this.modalService.dismissAll()
                  this.toastr.error('Impossible de  participee dans cette evenement','Notification')
                  console.log(err)
                })
  }

}
