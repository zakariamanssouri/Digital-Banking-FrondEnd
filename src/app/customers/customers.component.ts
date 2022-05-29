import { Component, OnInit } from '@angular/core';
import {data} from "autoprefixer";
import {CustomerService} from "../services/customer.service";
import { map, Observable } from 'rxjs';
import {Customer} from "../model/customer.model";
import {catchError} from "rxjs";
import {throwError} from "rxjs";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Observable<Array<Customer>> | undefined;
  errorMessage: string | undefined;
  searchFormGroup ! : FormGroup;
  constructor(private customerService:CustomerService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.searchFormGroup = this.formBuilder.group({
      keyword : this.formBuilder.control("")
    })
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {

    let keyword = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomer(keyword).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(customer:Customer) {
    let conf = confirm("Are you sure")
    if(!conf) return;
    this.customerService.deleteCustomer(customer.id).subscribe({
      next:data=>{
        this.customers = this.customers?.pipe(
          map(
            data=>{
              let index = data.indexOf(customer);
              data.slice(index,1)
              return data;
            }
          )
        )
      }
      ,error:err=>{
        console.log(err);
      }
    })
  }
}


