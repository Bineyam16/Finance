import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap";
import { MaintainCustomerService } from "../maintain-customer/maintain-customer.service";
import { NotificationsService } from "angular2-notifications";
import { ServiceService } from '../service.service';
import { environment } from "src/environments/environment";
@Component({
  selector: "app-list-customer",
  templateUrl: "./list-customer.component.html",
  styleUrls: ["./list-customer.component.css"],
})
export class ListCustomerComponent implements OnInit {
  @ViewChild("tabset") tabset: TabsetComponent;

  public CustomerList: any;
  public customer: Customer;
  public edit_form = false;

  @Output() selected = new EventEmitter();
  customerwithorg: any;
  searchText: string = '';
filteredCustomers: any[] = [];
searchColumns = {
  userName: '',
  name: '',
  address: '',
  mobile: '',
  salesTaxType: '',
  property_ID:''
};

  goto(id) {
    this.tabset.tabs[id].active = true;
  }

  constructor(
    private customerService: MaintainCustomerService,
    private notificationsService: NotificationsService,
    private serviceService: ServiceService
  ) {
    this.customer = new Customer();
  }

  ngOnInit() {
    this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).subscribe(
      (response)=>{

        console.log('response', response[0].organization_code);
 this.serviceService.getcustbyorg(response[0].organization_code).subscribe((response: any)=>{
  console.log(response,'customerrr');
  this.customerwithorg = response
  this.filteredCustomers = [...this.customerwithorg];

 })

      },
      (error)=>{
      console.log("user error");
      }
          );
    this.goto(1);
    this.getCustomers();
  }

  // filterCustomers() {
  //   const search = this.searchText.toLowerCase();
  //   this.filteredCustomers = this.customerwithorg.filter((customer) => {
  //     return (
  //       (customer.userName && customer.userName.toLowerCase().includes(search)) ||
  //       (customer.name && customer.name.toLowerCase().includes(search)) ||
  //       (customer.address && customer.address.toLowerCase().includes(search)) ||
  //       (customer.mobile && customer.mobile.toLowerCase().includes(search)) ||
  //       (customer.salesTaxType && customer.salesTaxType.toLowerCase().includes(search))
  //     );
  //   });
  // }
  refreshCustomerList(){
    this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).subscribe(
      (response)=>{

        console.log('response', response[0].organization_code);
 this.serviceService.getcustbyorg(response[0].organization_code).subscribe((response: any)=>{
  console.log(response,'refreshCustomerList');
  this.customerwithorg = response
  this.filteredCustomers = [...this.customerwithorg];

 })

      },
      (error)=>{
      console.log("user error");
      }
          );
  }

  filterCustomers() {
    this.filteredCustomers = this.customerwithorg.filter((customer) => {
      return (
        (this.searchColumns.userName
          ? customer.userName &&
            customer.userName.toLowerCase().includes(this.searchColumns.userName.toLowerCase())
          : true) &&
        (this.searchColumns.name
          ? customer.name &&
            customer.name.includes(this.searchColumns.name)
          : true) &&
        (this.searchColumns.address
          ? customer.address &&
            customer.address.toLowerCase().includes(this.searchColumns.address.toLowerCase())
          : true) &&
        (this.searchColumns.mobile
          ? customer.mobile &&
            customer.mobile.toLowerCase().includes(this.searchColumns.mobile.toLowerCase())
          : true) &&
        (this.searchColumns.salesTaxType
          ? customer.salesTaxType &&
            customer.salesTaxType.toLowerCase().includes(this.searchColumns.salesTaxType.toLowerCase())
          : true) &&
          (this.searchColumns.property_ID
            ? customer.property_ID &&
              customer.property_ID.toLowerCase().includes(this.searchColumns.property_ID.toLowerCase())
            : true)
      );
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(
      (response) => {
        this.CustomerList = response["procCCustomerLoadAlls"];
        console.log(this.CustomerList,'');
      },
      (error) => {
        console.log("error");
      }
    );
  }

  selectCustomer($event, customer) {
    $event.preventDefault();
    this.edit_form = true;
    this.customer = customer;
    console.log("customer", customer);

    this.goto(0);
  }

  addNewCustomer() {
    this.customer = new Customer();
    this.edit_form = false;
    this.goto(0);
  }

  closeup() {
    this.goto(1);
    this.customer = new Customer();
    this.getCustomers();
  }
}

class Customer {
  public name: String;
  public customer_ID: string;
  public org_Code: String;
  public address: string;
  public website: String;
  public sales_Tax_Type: string;
  public customer_Posting_Group: String;
  public gen_Bus_Posting_Group: string;
}
