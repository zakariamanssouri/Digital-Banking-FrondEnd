import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Customer} from "../model/customer.model";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) {
  }
  public getCustomers():Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.URI+"/customers");
  }
  
  public searchCustomer(keyword:string):Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.URI+"/customers/search?keyword="+keyword);
  }

  public saveCustomer(customer:Customer):Observable<Customer> {
    return this.http.post<Customer>(environment.URI+"/customers",customer);
  }

  public deleteCustomer(id:number) {
    return this.http.delete(environment.URI+"/customers/"+id);
  }
  
}
