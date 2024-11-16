import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  private Users = environment.rootPath2 + 'dbo/procaspnetUsers'
  private EmployeeByUser=environment.rootPath2+ 'HRA/CEmployee/UserID';
  private PlotManagementUrl = environment.rootPath + "Plot_Registration"; // URL to web api
  private PropertyListUrl = environment.rootPath + "Property_Registration"; // URL to web api
  private CertificateVersionUrl = environment.rootPath + "Certificate_Version"; // URL to web api
  private DeedUrl = environment.rootPath + "Deed_Registration"; // URL to web api
  private License_ServiceURL = environment.rootPath + "License_Service"; // URL to web api
  private saveFileLookUP = environment.rootPath + "BPEL/SaveDocumentMaster"; // URL to web api
  private EthiopianToGregorian = environment.rootPath2 + "EthiopianToGregorian";
  private CustomerTypeLookUP = environment.rootPath + "Customer_Type_Lookup"; // URL to web api
  private CustomerLookUP = environment.rootPath + "Customer"; // URL to web api
  private SuspendedReasonLookUP =
    environment.rootPath + "Suspension_Reason_Lookup"; // URL to web api
  private PropertyTypeLookUP = environment.rootPath + "Property_Type_Lookup"; // URL to web api
  private PropertyStatusLookUP = environment.rootPath + "Property_StatusLookup"; // URL to web api
  private ServiceDeliveryUnitLookUP = environment.rootPath + "BPEL/AllOrg";
  private Deed_Transfer_Lookup =
    environment.rootPath + "Deed_Transfer_Lookup/Get";
  private Lease_Type_Lookup = environment.rootPath + "Lease_Type_Lookup/Get";
  private WoredaLookUP = environment.rootPath + "Woreda_Lookup"; // URL to web api
  private PlotStutusLookUP = environment.rootPath + "Plotl_Status_Lookup"; // URL to web api
  private PlotLandUseLookUP = environment.rootPath + "Plot_Type_Of_Use_Lookup"; // URL to web api
  private saveFormDataURL = environment.rootPath + "BPEL/Savedata"; // URL to web api
  private getTaskRuleURL = environment.rootPath + "BPEL/TaskRule"; // URL to web api
  private getTodandAppNoURL = environment.rootPath + "BPEL/TodandAppNo"; // URL to web api
  private getRequerdURL =
    environment.rootPath + "BPEL/getRequrementDocumentOfTasks"; // URL to web api
  private nextTaskCompleteURL = environment.rootPath + "BPEL/nextTaskComplete"; // URL to web api
  private nextTaskAcceptOrRejectURl =
    environment.rootPath + "BPEL/nextTaskAcceptOrReject"; // URL to web api
  private SaveDataURL = environment.rootPath + "BPEL/SaveData"; // URL to web api
  private GetDataURL = environment.rootPath + "BPEL/GetData"; // URL to web api
  private BaseTable = environment.rootPath + "BaseTable"; // URL to web api
  private DocmentArcive = environment.rootPath + "DocmentArcive"; // URL to web api
  private UserWorkInfoURl = environment.rootApiPath + "view/ViewAspNetUsersWorkInfoDetail"; // URL to web api
  private select=environment.rootApiPath +"finance/procJBankReconTransaction";
  private BackURL = environment.rootPath + 'BPEL/TaskBack';  // URL to web api
  private GetNoteURL = environment.rootPath + 'BPEL/Get_postit_notes';
  private isvalidatedURL = environment.rootPath + "BPEL/isvalidated";
  private AddNoteURL = environment.rootPath + 'BPEL/Set_postit_notes';  // URL to web api
  private SendNoteURL = environment.rootPath + 'BPEL/sendNot';  // URL to web api
  private DeleteNoteURL = environment.rootPath + 'BPEL/Delete_postit_notes';  // URL to web api
  private SaveNoteURL = environment.rootPath + 'BPEL/Edit_postit_notes';
  private getAllDocumentURL = environment.rootPath + 'BPEL/getAllDocument';  // URL to web api
  private cust = environment.rootPath2 + 'view/View_For_customer_mantenance/'
  private propertytype = environment.rootPath2 + 'ProprtyData/procProportyTypeLockup'
  private propertyforcust = environment.rootPath2 + 'view/View_for_customer_property_mentenace/'
  private RentContractUpdate = environment.rootPath2 + 'RentContractUpdate'
      private custphone = environment.rootPath2 +"CustomerMobileUpdate"
         private termntepaymentview = environment.rootPath2 +"view/View_for_terminate_property_payment/"
             private deletepayment = environment.rootPath2 + "DeleteRentCollectionEach"
             private gregorianToEthiopianDate = environment.rootPath2 + "gregorianToEthiopianDate";
      private Manage_Rent_Collection_Transactions = environment.rootPath2 + "proc_Manage_Rent_Collection_Transactions/manage"

     private updatemontlyunpaid = environment.rootPath2 + "RentContract/update-monthly-unpaid"
  userid: string;
  AppNO;
  AppCode;
  desplayuserid: boolean;
  constructor(private http: HttpClient) {

  }

  saveFormData(formData) {
    const ApplicationCode = '00000000-0000-0000-0000-000000000000';
    const serviceId = '000000-0000-0000-0000-000000000000';
    const taskid = 'c8c52994-57e4-4b3a-a7be-1d00ea0db37f';
    const orgid = '930d1c20-9e0e-4a50-9eb2-e542fafbad68';
    const userid = environment.username;
    const json = formData;
    const docid = '00000000-0000-0000-0000-000000000000';
    return this.http.put<any>(this.saveFormDataURL, {
      ApplicationCode,
      serviceId,
      taskid,
      orgid,
      userid,
      json,
      docid
    });
  }
  updatecustphone(data){
    return this.http.put(this.custphone, data)
  }
  deleteRentCollection(data: { property_ID: string; doc_Num: string; Period: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Ensure the content type is set to JSON
    });

    // Use the `delete` method with body (compatible with Angular 9+)
    return this.http.request('delete', this.deletepayment, { headers, body: data });
  }
  updateRentCollection(data: { propertyID: string, penality: boolean}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Ensure the content type is set to JSON
    });

    // Use the `delete` method with body (compatible with Angular 9+)
    return this.http.post(this.updatemontlyunpaid, data, { headers });
  }
  Manage_Rent_Collection_Transactionspost(data: { property_ID: string; Period:string; }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Ensure the content type is JSON
    });

    // Send POST request with the provided data
    return this.http.post(this.Manage_Rent_Collection_Transactions, data, { headers });
  }
  getEthiopianToGregorian(date){
    if (date){

      // let year=parseInt(date.split('/')[2])
      // let month=parseInt(date.split('/')[1])
      // let day=parseInt(date.split('/')[0])
      let year=parseInt(date.split('-')[0])
      let month=parseInt(date.split('-')[1])
      let day=parseInt(date.split('-')[2])


      return this.http.get<any>(this.EthiopianToGregorian + "/" + year +"/"+month +"/"+ day)

    }
  }
  getgregorianToEthiopianDate(date){
    if (date){
    let year=parseInt(date.split('-')[0])
    let month=parseInt(date.split('-')[1])
    let day=parseInt(date.split('-')[2].split(':')[0].split('T')[0])


     return this.http.get<any>(this.gregorianToEthiopianDate + "/" + year +"/"+month +"/"+ day)


    }
  }
getcustbyorg(orgid){
  return this.http.get(this.cust + orgid)
}
gettermintepayment(property_id :any){
  return this.http.get<any>(this.termntepaymentview + property_id)
}
updateRentContractUpdate(data){
  return this.http.put(this.RentContractUpdate, data)
}
getpropertydata(cust){
  return this.http.get(this.propertyforcust + cust)
}
getpropertytype(){
  return this.http.get(this.propertytype)
}
  isvalidated(todoid, taskid, Plotid, ProperyID, DocID) {
    return this.http.get(
      this.isvalidatedURL +
      "?Username=" +
      environment.username +
      "&todoid=" +
      todoid +
      "&taskid=" +
      taskid +
      "&Plotid=" +
      Plotid +
      "&ProperyID=" +
      ProperyID +
      "&DocID=" +
      DocID
    );
  }
  getAllDocument(ApplicationCode, DocID) {
    return (this.http.get<any[]>(this.getAllDocumentURL + '?' + 'ApplicationCode=' + ApplicationCode + '&DocID=' + DocID));
  }
  getTrans(){
    return this.http.get<any>(this.select);
  }
  Back(ApplicationNo, todoid) {
    return (this.http.post(this.BackURL + '?' + 'ApplicationNo=' + ApplicationNo + '&UserName=' +
      environment.username + '&todoid=' + todoid, null));
  }
  saveNote(msg, noteid, docid) {
    return this.http.post(this.SaveNoteURL + '?msg=' + msg + '&postitid=' +
      noteid + '&docid=' + docid, null);
  }
  addNote(ApplicationNumber, Msg, docid) {
    return this.http.post(this.AddNoteURL + '?Application_number=' + ApplicationNumber + '&uid=' + environment.username + '&Msg=' +
      Msg + '&docid=' + docid, null);
  }
  DeleteNote(ApplicationNo, noteid) {
    return this.http.post(this.DeleteNoteURL + '?Application_number=' + ApplicationNo + '&postitid=' + noteid, null);
  }

  sendNote(msg, AppNo, todoid, orgid) {
    return this.http.post(this.SendNoteURL + '?meg=' + msg + '&Application_number=' +
      AppNo + '&todoid=' + todoid + '&orgid=' + orgid, null);
  }
  GetNote(ApplicationNo) {
    return this.http.post(this.GetNoteURL + '?Application_number=' + ApplicationNo, null);
  }
  saveFile(
    DocData,
    FileType,
    ApplicationNo,
    RequrementID,
    TaskType,
    Requrement
  ) {
    // console.log('File', File);
    /*return this.http.post(this.saveFileLookUP + '?' + 'TaskType=' + TaskType + '&ApplicationNo=' + ApplicationNo + '&DocData=' + File + '&uid=00000000-0000-0000-0000-000000000000' + '&FileType=' + Type + '&RequrementID=' + ReqId + '&Requrement=' + Requrement, null);*/

    return this.http.post(this.saveFileLookUP, {
      TaskType,
      ApplicationNo,
      DocData,
      uid: "00000000-0000-0000-0000-000000000000",
      FileType,
      RequrementID,
      Requrement,
    });
  }
  removeSlash(string){
    if(string == null) return;
    return string.replace(/\//g, "%2F");
  }
  getBaseTable(plotid) {
    return this.http.get(
      this.BaseTable +
        "?" +
        "sortOrder=test&currentFilter=" +
        plotid +
        "&searchStringByPID&searchStringByPloteID&pageIndex&pageSize"
    );
  }
  getDocmentArcive() {
    return this.http.get(
      this.DocmentArcive +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  UpdateDocmentArcive(plotid) {
    return this.http.get(
      this.DocmentArcive +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  CreateDocmentArcive(plotid) {
    return this.http.get(
      this.DocmentArcive +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  getPayment(plotid) {
    return this.http.get(
      this.DocmentArcive +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  getPaymentDetail(plotid) {
    return this.http.get(
      this.DocmentArcive +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  savePayment(plotid) {
    return this.http.get(
      this.DocmentArcive +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  getUsers(){
    return this.http.get<any>(this.Users)
  }
  getEmployeeByUserID(userID){
    return this.http.get<any>(this.EmployeeByUser+'/'+userID)
  }
  disableBrowserBackButton(){
    window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
          window.history.go(1);
      };
}
  addPaymentDetail(plotid) {
    return this.http.get(
      this.DocmentArcive +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  savePaymentDetail(plotid) {
    return this.http.get(
      this.DocmentArcive +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  ////
  getTodandAppNo(AppNo) {
    return this.http.get<any[]>(
      this.getTodandAppNoURL + "?" + "ApplicationNo=" + AppNo
    );
  }

  getAll(AppNo) {
    return this.http.get<any[]>(
      this.License_ServiceURL +
        "?" +
        "sortOrder=test&currentFilter=" +
        AppNo +
        "&searchString&pageIndex&pageSize"
    );
  }

  getPriveys(certefcatcode) {
    return this.http.get<any[]>(
      this.License_ServiceURL +
        "?" +
        "sortOrder=test&currentFilter=" +
        certefcatcode +
        "&searchString&pageIndex&pageSize"
    );
  }

  getRequerdDocs(TaskID) {
    return this.http.get(this.getRequerdURL + "?TaskID=" + TaskID);
  }

  getTaskRule(tasksId) {
    return this.http.post(
      this.getTaskRuleURL + "?" + "taskid=" + tasksId,
      null
    );
  }

  getPlotManagement(plotid) {
    return this.http.get(
      this.PlotManagementUrl +
        "?" +
        "sortOrder=test&currentFilter=" +
        plotid +
        "&searchString&pageIndex&pageSize"
    );
  }

  getPropertyList(plotid) {
    return this.http.get(
      this.PropertyListUrl +
        "?" +
        "sortOrder=test&currentFilter=" +
        plotid +
        "&searchStringByPID&searchStringByPloteID&pageIndex&pageSize"
    );
  }

  getDeedTable(propertyID) {
    return this.http.get(
      this.DeedUrl +
        "?" +
        "sortOrder=test&currentFilter=" +
        propertyID +
        "&searchString&pageIndex&pageSize"
    );
  }

  getCertificateVersion(ownerShipid) {
    return this.http.get(
      this.CertificateVersionUrl +
        "?" +
        "sortOrder=test&currentFilter=" +
        ownerShipid +
        "&searchString&pageIndex&pageSize"
    );
  }

  getCustomerLookUP() {
    return this.http.get(
      this.CustomerLookUP +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }

  getCustomerTypeLookUP() {
    return this.http.get(
      this.CustomerTypeLookUP +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }


  getSuspendedReasonLookUP() {
    return this.http.get(
      this.SuspendedReasonLookUP +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }

  getPropertyTypeLookUP() {
    return this.http.get(
      this.PropertyTypeLookUP +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }

  getPropertyStatusLookUP() {
    return this.http.get(
      this.PropertyStatusLookUP +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }

  getServiceDeliveryUnitLookUP() {
    return this.http.get(
      this.ServiceDeliveryUnitLookUP +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }

  getTransferTypeLookUP() {
    return this.http.get(
      this.Deed_Transfer_Lookup +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  getLease_Type_Lookup() {
    return this.http.get(
      this.Lease_Type_Lookup +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }

  getWoredaLookUP() {
    return this.http.get(
      this.WoredaLookUP +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }

  getPlotStutusLookUP() {
    return this.http.get(
      this.PlotStutusLookUP +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }

  getPlotLandUseLookUP() {
    return this.http.get(
      this.PlotLandUseLookUP +
        "?" +
        "sortOrder=test&currentFilter&searchString&pageIndex&pageSize"
    );
  }
  getViewAspNetUsersWorkInfoDetail(User_ID){
    User_ID = this.removeSlash(User_ID);
    return this.http.get<any>(this.UserWorkInfoURl + '/' + User_ID);
  }
  Submit(AppCode, docID, todoID, ruleid) {
    return this.http.post(
      this.nextTaskCompleteURL +
        "?ApplicationNo=" +
        AppCode +
        "&docid=" +
        docID +
        "&todoid=" +
        todoID +
        "&userName=" +
        environment.username +
        "&status=C&Taskruleid=" +
        ruleid +
        "&ispending=false",
      null
    );
  }

  SubmitAR(AppCode, docID, todoID, ruleid) {
    return this.http.post(
      this.nextTaskAcceptOrRejectURl +
        "?ApplicationNo=" +
        AppCode +
        "&docid=" +
        docID +
        "&eid=00000000-0000-0000-0000-000000000000&isPending=false&todoid=" +
        todoID +
        "&userName=" +
        environment.username +
        "&status=C&taskruleid=" +
        ruleid,
      null
    );
  }

  saveForm(ApplicationCode, serviceId, taskid, orgid, json, docid,todoID) {
   // orgid = "1e60f3a1-7017-47bf-95f4-f0e47c793c72";
    return this.http.post(this.SaveDataURL + '?ApplicationCode=' + ApplicationCode + '&serviceId=' +
      serviceId + '&taskid=' + taskid + '&orgid=' + orgid + '&UserName=' + environment.username + '&json=' + json + '&docid=' +
      docid + "&todoID=" +
      todoID, null);
  }
  GetForm(docid) {
    return this.http.get(this.GetDataURL + "?docid=" + docid);
  }

  getUserWorkInfo () {
    return this.http.get(this.UserWorkInfoURl + "/" + environment.username)
  }

}
