import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit( f : NgForm ){
      console.log(f.value);
      const data = {
        username : f.controls.username.value,
        email : f.controls.email.value,
        password : f.controls.password.value,
        role : 'Admin'
      }
      console.log(data);
      axios.post('http://127.0.0.1:8000/auth/signup',data).then( res => {
            if (res.status == 201 ){
              console.log(res.data)
              this.toastr.success('Inscription Administrateur effectue avec succes', 'Notification d\'inscription');
              f.resetForm();
              
            }

      }).catch( err => {
        this.toastr.error('Verifiee vos donnes ','Notification d\'inscription');
         
        console.log(err)
      })

  }
}
