import { Component, OnInit } from '@angular/core';
import {data} from "autoprefixer";
import {CustomerService} from "../services/customer.service";
import { Observable } from 'rxjs';
import {Customer} from "../model/customer.model";
import {catchError} from "rxjs";
import {throwError} from "rxjs";


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Observable<Array<Customer>> | undefined;
  errorMessage: string | undefined;
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }
}


