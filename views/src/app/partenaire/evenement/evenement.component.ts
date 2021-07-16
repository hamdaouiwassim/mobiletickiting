import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  sowedEvent : any
  selectedFile : File = null
  events : any = [];
  part : any = {};
  categories : any = [];
  constructor(private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategories()
   // this.getCurrentPartenaire()
    this.getEvents()
  }
  getCategories(){
    axios.get('http://127.0.0.1:8000/admin/categories').then(res=>{

      this.categories = res.data;
      }).catch(err=>{

      })
}
 
  getCurrentPartenaire(){

    const id = localStorage.getItem('idUser')
    axios.get('http://127.0.0.1:8000/user/partenaire/'+id).then(res => {
      //console.log(res.data[0])
      localStorage.setItem('partenaire',res.data[0]._id) 
      //console.log(this.part)
 
    }).catch(err=>{

    })
  }
  onSelectFile(event){
    console.log(event);
    this.selectedFile = event.target.files[0];

  }
  getEvents(){
    //alert('hello')
    this.getCurrentPartenaire()
    console.log(this.part)
    axios.get('http://127.0.0.1:8000/partenaire/'+localStorage.getItem('partenaire')+'/events').then(res=>{
            this.events = res.data;
        }).catch(err=>{
          console.log(err);
        })
}
  addEvent( f : NgForm){
    //const id = localStorage.getItem('idUser')
    const data = new FormData();
      data.append('nom' , f.controls.nom.value)
      data.append('description' , f.controls.description.value)
      data.append('categorie' , f.controls.categorie.value)
      data.append('partenaire' ,localStorage.getItem('partenaire'))
      data.append('prixstd' , f.controls.prixstd.value)
      data.append('prixprm' , f.controls.prixprm.value)
      data.append('nbrstd' , f.controls.nbrstd.value)
      data.append('nbrprm' , f.controls.nbrprm.value)
      data.append('image' , this.selectedFile)
      data.append('date' , f.controls.date.value)
      data.append('heure' , f.controls.heure.value)
    
    console.log(data)
    axios.post('http://127.0.0.1:8000/partenaire/event/add',data).then(res => {
      //this.partenaire = res.data
      
      console.log(res.data);
      this.toastr.success('Evenement ajoutee avec success','Partenaire Notification')
      this.modalService.dismissAll()
    this.getEvents()
 
    }).catch(err=>{

    })
  }
// Models
open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   // this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
   // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

showEvent(content,event){
  this.sowedEvent = event
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    // this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
    // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });

}

deleteEvent(id){

  if ( confirm('Voulez-vous vraiment supprimer cette evenement?')){
    axios.get('http://127.0.0.1:8000/partenaire/event/'+id+'/delete').then(res => {
      //this.partenaire = res.data
      
      console.log(res.data);
      this.toastr.success('Evenement supprimee','Partenaire Notification')
      this.modalService.dismissAll()
    this.getEvents()
  
    }).catch(err=>{
  
    })
  }
 
}

}
