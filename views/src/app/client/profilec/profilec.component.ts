import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profilec',
  templateUrl: './profilec.component.html',
  styleUrls: ['./profilec.component.css']
})
export class ProfilecComponent implements OnInit {


  constructor(private router: Router,private modalService:NgbModal,private toastr : ToastrService) { }
  user = {
    id : '',
    nom : '',
    prenom : '',
    telephone : '',
    username : '',
    email : ''       
};
ngOnInit(): void {

  if (localStorage.getItem('token') == null ){
    this.router.navigate(['/login']);

  }

  this.user.username = localStorage.getItem('username');
  this.user.email = localStorage.getItem('email');
  this.user.nom = localStorage.getItem('nom');
  this.user.prenom = localStorage.getItem('prenom');
  this.user.telephone = localStorage.getItem('telephone');

  this.user.id = localStorage.getItem('idUser');
}


open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   // this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
   // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  UpadateUser(f:NgForm){
    
      axios.post('http://127.0.0.1:8000/user/profile/'+this.user.id+'/update',f.value).then(res=>{
        this.modalService.dismissAll()
        this.toastr.success('Information de profile modifiee','Notification')
        this.user.username = f.controls.username.value ;
        this.user.email =f.controls.email.value ;
        this.user.nom = f.controls.nom.value ;
        this.user.prenom = f.controls.prenom.value ;
        this.user.telephone = f.controls.telephone.value ;
        localStorage.setItem('username',f.controls.username.value ) ;
        localStorage.setItem('email',f.controls.email.value ) ;
        localStorage.setItem('nom',f.controls.nom.value ) ;
        localStorage.setItem('prenom',f.controls.prenom.value ) ;
        localStorage.setItem('telephone',f.controls.telephone.value ) ;
      }).catch(err=>{
        
      })
  }

}
