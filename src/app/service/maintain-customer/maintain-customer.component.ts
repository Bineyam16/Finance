import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap";
import { MaintainCustomerService } from "./maintain-customer.service";
import { NotificationsService } from "angular2-notifications";
import { ServiceService } from "../service.service";
import { NgxSmartModalService } from "ngx-smart-modal";
@Component({
  selector: "app-maintain-customer",
  templateUrl: "./maintain-customer.component.html",
  styleUrls: ["./maintain-customer.component.css"],
})
export class MaintainCustomerComponent implements OnInit {
  public CustomerList: any;
  public TaxTypes: any;
  public BusPostingGroups: any;
  public CustomerPostingGroups: any;

  public customersSearchResult: any;

  @ViewChild("tabset") tabset: TabsetComponent;
  @Input() customer;
  @Input() edit_form;
  @Output() customerUpdated = new EventEmitter<void>();
  @Output() onclose = new EventEmitter();
  country: any;
  countrys: Object;
  customerusername: any;
  org: any;
  orgName: any;
  nameEn: any;
  propertytype: any;
  property_id: any;
  halfVAT: boolean
  haveNoWTH: boolean
  selectedValue: string;
  selectedpropertytype: boolean= false;
  customerID: any;
  custphonechange: boolean =false;
  payment: any;
  postingdate: any;
  posting_date: any
  penality: boolean =false;

  goto(id) {
    this.tabset.tabs[id].active = true;
  }

  constructor(
    private customerService: MaintainCustomerService,
    private notificationsService: NotificationsService,
    private service : ServiceService,
    private cdRef: ChangeDetectorRef,
    public ngxModal: NgxSmartModalService,

  ) {
    this.customer = new Customer();
  }

  ngOnInit() {
    this.getCustomers();
    this.getTaxType();
    this.getBusPostingGroups();
    this.getCustomerPostingGroups();
    this.getpropertytype()
    console.log('Initial Half VAT:', this.halfVAT);
    console.log('Initial Have No WTH:', this.haveNoWTH);
    this.service.getgregorianToEthiopianDate(this.getCurrentDate()).subscribe((respons: any) => {
      console.log(respons.nowTime, 'dateeee');

      const ethiopianDate = respons.nowTime; // e.g., "11/2/2017" or "2016-01-01"

      // Check if the response is in MM/DD/YYYY or YYYY-MM-DD format
      let ethiopianYear;
      if (ethiopianDate.includes('/')) {
        ethiopianYear = parseInt(ethiopianDate.split('/')[2]); // For MM/DD/YYYY format
      } else {
        ethiopianYear = parseInt(ethiopianDate.split('-')[0]); // For YYYY-MM-DD format
      }

      // Use the Ethiopian year in getStartDatesOfYear
      this.posting_date = getStartDatesOfYear(ethiopianYear);
      console.log(this.posting_date, 'this.posting_date');
      this.dateAsObject(this.posting_date)
    });
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero
    const day = ('0' + today.getDate()).slice(-2); // Add leading zero

    return `${year}-${month}-${day}`;

  }
  ngOnChanges(changes): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if (changes.customer.currentValue) {
    //  this.customer = changes.customer.currentValue;
      console.log(changes.customer.currentValue,'this.customer');
      // Assuming 'changes.customer.currentValue' contains the data provided
const currentValue = changes.customer.currentValue;

// Map the data to the Customer class
this.customer = {
  name: currentValue.name,
  customer_ID: currentValue.customerID,
  org_Code: currentValue.orgCode,
  address: currentValue.address || '',
  website: currentValue.website || '',
  sales_Tax_Type: currentValue.salesTaxType || '',
  customer_Posting_Group: currentValue.customerPostingGroup || '',
  gen_Bus_Posting_Group: currentValue.genBusPostingGroup || '',
  last_Date_Modified: currentValue.lastDateModified || null,
  postal_code: currentValue.postalCode || '',
  country: currentValue.country || '',
  contact: currentValue.contact || '',
  sales_Person_code: currentValue.salesPersonCode || '',
  telephone_Office: currentValue.telephoneOffice || '',
  mobile: currentValue.mobile || '',
  email: currentValue.email || '',
  price_Including_VAT: currentValue.priceIncludingVAT || false,
  prePayment_Per: currentValue.prePaymentPer || 0,
  tin: currentValue.tin || '',
  payment_Terms_Code: currentValue.paymentTermsCode || '',
  payment_Method_code: currentValue.paymentMethodCode || '',
  fin_Charge_Terms_code: currentValue.finChargeTermsCode || '',
  last_statement_No: currentValue.lastStatementNo || '',
  credit_Limit: currentValue.creditLimit || 0,
  userId: currentValue.userId || '',
};
this.customerusername = currentValue.userName
this.orgName = currentValue.orgName
this.nameEn = currentValue.nameEn
this.customerID = currentValue.customerID
this.service.getpropertydata(currentValue.customerID).subscribe((response: any)=>{
  console.log(response[0].propertyID,'responseprooo');
  this.property_id = response[0].propertyID
  this.halfVAT = response[0].halfVAT
  this.haveNoWTH = response[0].haveNoWTH
  this.gettermintepayment(this.property_id)
  this.cdRef.detectChanges();
})
    }
    this.getGetLookups()

  }
  Manage_Rent_Collection_Transactionspost() {
    console.log(this.postingdate, 'postingdate');

    const requestBody = {
      property_ID: this.property_id ,// Ensure the selectedContract is properly set
      Period: this.postingdate
    };
if(this.penality === true){
  this.service.updateRentCollection({ propertyID: this.property_id , penality: this.penality}).subscribe((res: any)=>{
    this.notificationsService.success('Success', 'with penality');
  });

  this.service.Manage_Rent_Collection_Transactionspost(requestBody).subscribe(
    (res: any) => {
      // Show success notification upon successful response
      this.notificationsService.success('Success', 'Posted');
      this.gettermintepayment(this.property_id)
    },
    (error) => {
      console.error('Error posting rent collection transactions:', error);
      this.notificationsService.error('Error', 'can not post');
      // Handle error case here, maybe show an error notification
    }
  );
}
else {
  this.service.updateRentCollection({ propertyID: this.property_id , penality: this.penality}).subscribe((res: any)=>{
    this.notificationsService.success('Success', 'without penality');
  });

  this.service.Manage_Rent_Collection_Transactionspost(requestBody).subscribe(
    (res: any) => {
      // Show success notification upon successful response
      this.notificationsService.success('Success', 'Posted');
      this.gettermintepayment(this.property_id)
    },
    (error) => {
      console.error('Error posting rent collection transactions:', error);
      this.notificationsService.error('Error', 'can not post');
      // Handle error case here, maybe show an error notification
    }
  );
}
  }
  onpenalityChange(event: any) {
    console.log(event, 'logggggg');

    if (event === true) {
      this.penality = true
    }
    else {
      this.penality = false
    }
    console.log(event, 'logggggg',this.penality);
  }
  onHalfVATChange(event: boolean) {
    console.log('Half VAT changed:', event);
    this.halfVAT = event;
    // Add your custom logic here
  }

  // Method triggered when 'Have No WTH' checkbox is changed
  onHaveNoWTHChange(event: boolean) {
    console.log('Have No WTH changed:', event);
    this.haveNoWTH = event;
    // Add your custom logic here
  }
  onPostingDateChange(event: any) {
    // Get the selected date value
    const selectedDate = event.target.value;

    // Handle the selected date (for example, you can log it or perform other actions)
    console.log('Selected Posting Date:', selectedDate);
    this.service.getEthiopianToGregorian(selectedDate).subscribe((res: any)=>{
      this.postingdate = res.nowTime.split('T')[0];
      console.log('postingdate',res, this.postingdate );
    })

    // You can also set it to a property if needed
    // this.selectedPostingDate = selectedDate;
  }
  deletePayment(data: any) {
    const deletedata = {
      property_ID: data.property_ID, // Assuming data.property_ID exists
      doc_Num: data.document_No,
      Period:data.posting_Date      // Assuming data.document_No exists
    };

    this.service.deleteRentCollection(deletedata).subscribe(
      (res) => {
        // Handle successful deletion
        console.log('Payment deleted successfully', res);

        // Optionally, remove the deleted item from the local payment array
        //this.payment = this.payment.filter(item => item.document_No !== data.document_No);
        this.gettermintepayment(this.property_id)
        // Show success notification
        this.notificationsService.success('Success', 'Deleted');
      },
      (error) => {
        console.error('Error deleting payment:', error);
        // Handle error case, maybe show an error notification
      }
    );
  }
  gettermintepayment(property_ID: any){
    this.service.gettermintepayment(property_ID).subscribe((res: any)=>{
     this.payment = res
     console.log(res,this.payment,'response');


    })
     }
  closeModal4() {
    this.ngxModal.getModal('date').close();
  }
  openModal4() {
    this.ngxModal.getModal('date').open();

  }
  openModal3() {
    this.ngxModal.getModal('pay').open();

  }
  closeModal3() {
    this.ngxModal.getModal('pay').close();
  }
  getGetLookups() {
    this.customerService.getLookup("Country").subscribe(
      (response) => {
        this.countrys = response;
        console.log("country", response);
      },
      (error) => {
        console.log("employeeTypes", error);
      }
    );
  }
  getpropertytype(){
    this.service.getpropertytype().subscribe((response: any)=>{
      console.log(response['procProportyType'],'responsetype');
      this.propertytype = response['procProportyType']

    })
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(
      (response) => {
        this.CustomerList = response["procCCustomerLoadAlls"];
      },
      (error) => {
        console.log("error");
      }
    );
  }
  onMobileChange(value: string): void {
    console.log('Mobile number changed to:', value);
    this.custphonechange = true
    // You can perform any logic you need when the mobile number changes
  }
  updatePhoneNumber() {
    console.log(this.customerID, 'this.customerID');

    const data = {
      customer_ID: this.customerID,  // Pass the customer ID
      newMobileNo: this.customer.mobile       // Pass the new phone number
    };

    // Call the service method to update customer phone
    this.service.updatecustphone(data).subscribe(
      success => {
        this.notificationsService.success("Success", 'Phone number updated successfully');

        console.log('Phone number updated successfully :: ', success);
      },
      error => {
        this.notificationsService.error('Error', 'Unable to update phone number');
        console.error('Unable to update phone number :: ', error);
      }
    );
  }

  onPropertyTypeChange(selectedValue: any): void {
    console.log('Selected Property Type:', selectedValue);
    if(selectedValue > 14){

    this.selectedpropertytype = true
    }
    else{
      this.selectedpropertytype = false
    }
    this.selectedValue = selectedValue
    // You can implement additional logic here
  }

  getCustomerPostingGroups() {
    this.customerService.getCustomerPostingGroups().subscribe(
      (response) => {
        this.CustomerPostingGroups = response["procCustomerPostingGroups"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getBusPostingGroups() {
    this.customerService.getBusPostingGroups().subscribe(
      (response) => {
        this.BusPostingGroups = response["procGenBusPostingGroupss"];
        console.log('this.BusPostingGroups',this.BusPostingGroups);

      },
      (error) => {
        console.log("error");
      }
    );
  }

  getTaxType() {
    this.customerService.getTaxTypes().subscribe(
      (response) => {
        this.TaxTypes = response["procCTaxs"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  searchCustomers(event): void {
    this.customersSearchResult = this.CustomerList.filter((c) =>
      c.customer_ID.includes(event.query)
    );

  }
  CheckPrimaryKey(){
    this.customerService.getcheckprimarykey(this.customer.customer_ID.customer_ID).subscribe(
    (response)=>{
      console.log(":: length",response.procCCustomerLoadAlls.length);
    if(response.procCCustomerLoadAlls.length>0){


      console.log("response ::",response);
      const toast = this.notificationsService.warn(
        "Warning",
        "customer id is duplicate primary key please insert another value"
      );
    }
    },
    (error)=>{
      const toast = this.notificationsService.error(
        "Error",
        "SomeThing Went Wrong"
      );
    }

    );

    }
  addCustomer() {
    this.customer.last_Date_Modified=null;
    console.log("::",this.customer);
    this.customerService.addCustomer(this.customer).subscribe(
      (response) => {
        this.getCustomers();
        const toast = this.notificationsService.success("Success", "Saved");
        this.closeup();
      },
      (error) => {
        console.log("res", error);

        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.customer).subscribe(
      (response) => {
        this.getCustomers();
        this.customerUpdated.emit();
        const toast = this.notificationsService.success("Success", "Updated");

if(this.selectedpropertytype ===true){

  const data = {
    propertyID: this.property_id,
    halfVAT: this.halfVAT,
    haveNoWTH: this.haveNoWTH
  };
  this.service.updateRentContractUpdate(data).subscribe((response: any)=>{
    const toast = this.notificationsService.success("Success", "Updated Half Vat And WTH ");
  })
}
if(this.custphonechange === true){
  this.updatePhoneNumber()
}
        this.closeup();
      },
      (error) => {
        console.log("res", error);

        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  deleteCustomer() {
    if (confirm("are you sure you went to delete the selected item"))
      this.customerService.deleteCustomer(this.customer).subscribe(
        (response) => {
          this.getCustomers();
          const toast = this.notificationsService.success("Success", "Saved");

          this.closeup();
        },
        (error) => {
          console.log("res", error);

          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  cleanUp() {
    // this.edit_form = false;
  }
  closeup() {
    this.onclose.emit();
  }
  dateAsObject(dateString: string): Date {
    return new Date(dateString); // Converts the string to a Date object
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
  public last_Date_Modified;
  public postal_code: string;
  public country: string;
  public contact: string;
  public sales_Person_code: string;
  public telephone_Office: string;
  public mobile: string;
  public email: string;
  public price_Including_VAT: boolean;
  public prePayment_Per: number;
  public tin: string;
  public payment_Terms_Code: string;
  public payment_Method_code: string;
  public fin_Charge_Terms_code: string;
  public last_statement_No: string;
  public credit_Limit: number;
  public userId: string;
}
function getStartDatesOfYear(year: number): string[] {

  const startDates: string[] = [
    `2016-11-01`,
    `2016-12-01`,
    `2017-01-01`,
    `2017-02-01`,
    `2017-03-01`,
    `2017-04-01`,
    `2017-05-01`,
    `2017-06-01`,
    `2017-07-01`,
    `2017-08-01`,
    `2017-09-01`,
    `2017-10-01`,
    `2017-11-01`,
    `2017-12-01`
    // `${year}-01-01`,
    // `${year}-02-01`,
    // `${year}-03-01`,
    // `${year}-04-01`,
    // `${year}-05-01`,
    // `${year}-06-01`,
    // `${year}-07-01`,
    // `${year}-08-01`,
    // `${year}-09-01`,
    // `${year}-10-01`,
    // `${year}-11-01`,
    // `${year}-12-01`
  ];

  return startDates;
}
