import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MaintainCustomerService {
  public rootApiPath = environment.rootApiPath;
  public lookupUrl = environment.rootLookupApiPath + "";
  constructor(public http: HttpClient) {}
  getLookup(table) {
    return this.http.get(this.lookupUrl + "?DropGownName=" + table);
  }
  getCustomers() {
    return this.http.get(this.rootApiPath + "finance/procCCustomer");
  }
  getcheckprimarykey(id){
    return this.http.get<any>(this.rootApiPath + "finance/procCCustomer"+"/"+ id);
  }
  getTaxTypes() {
    return this.http.get(this.rootApiPath + "finance/CTax");
  }

  getCustomerPostingGroups() {
    return this.http.get(this.rootApiPath + "finance/CustomerPostingGroup");
  }

  getBusPostingGroups() {
    return this.http.get(this.rootApiPath + "finance/GenBusPostingGroups");
  }

  addCustomer(customer) {
    return this.http.post(this.rootApiPath + "finance/procCCustomer", customer);
  }

  updateCustomer(customer) {
    return this.http.put(this.rootApiPath + "finance/procCCustomer", customer);
  }

  deleteCustomer(customer) {
    return this.http.delete(
      this.rootApiPath + "finance/procCCustomer/" + customer.customer_ID
    );
  }
}
