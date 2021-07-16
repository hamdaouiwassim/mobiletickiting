import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-partenaire',
  templateUrl: './register-partenaire.component.html',
  styleUrls: ['./register-partenaire.component.css']
})
export class RegisterPartenaireComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit( f : NgForm ){
      console.log(f.value);
      const data = {
        username : f.controls.username.value,
        email : f.controls.email.value,
        password : f.controls.password.value,
        role : 'Partenaire'
      }
      console.log(data);
      axios.post('http://127.0.0.1:8000/auth/signup',data).then( res => {
            if (res.status == 201 ){
              console.log(res.data)
              this.toastr.success('Inscription Partenaire effectue avec succes', 'Notification d\'inscription');
              f.resetForm();
              
            }

      }).catch( err => {
        this.toastr.error('Verifiee vos donnes ','Notification d\'inscription');
         
        console.log(err)
      })

  }

}
