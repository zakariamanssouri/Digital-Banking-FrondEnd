import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'autoprefixer';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup! : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private customerService:CustomerService,
    private router:Router
    
    ) { }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.formBuilder.group({
      name:this.formBuilder.control(null,[Validators.required,Validators.minLength(4)]),
      email:this.formBuilder.control(null,[Validators.email,Validators.required]),
    })
  }

  handleSaveCustomer() {
    let customer:Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next:data=> {
        alert("Customer has been  Successfully Saved")
        this.router.navigateByUrl("/customers")
      },error:err=> {
        console.log(err)
      }
    });

  }

}
