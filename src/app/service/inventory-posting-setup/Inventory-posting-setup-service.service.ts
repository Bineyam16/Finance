import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class InventoryPostingSetupService {
  private getInventoryPostingSetupListUrl =
    environment.rootPath2 + "finance/InventoryPostingSetup";
  private getChartOfAccountUrl = environment.rootPath2 + "bscChartOfAccount";
  private inventoryPostingGroupUrl = environment.rootPath2 + "inventory/Inventory_procInventoryPostingGroup";
private getStoreurl=environment.rootPath2 +"inventory/Store";
  ChartOfAccount;

  constructor(private http: HttpClient) {}

  getInventoryPostingGroups() {
    return this.http.get(this.inventoryPostingGroupUrl);
  }
  getcheckprimarykey(id){
    return this.http.get<any>(this.getStoreurl +"/"+ id);
  }
  getInventoryPostingSetupList() {
    return this.http.get(this.getInventoryPostingSetupListUrl);
  }

  saveNewInventoryPosting(inventoryPostingGroup) {
    return this.http.post(
      this.getInventoryPostingSetupListUrl,
      inventoryPostingGroup
    );
  }

  updateInventoryPosting(inventoryPostingGroup) {
    return this.http.put(
      this.getInventoryPostingSetupListUrl,
      inventoryPostingGroup
    );
  }

  deleteInventoryPosting(inventoryPostingGroup) {
    return this.http.delete(
      this.getInventoryPostingSetupListUrl +
        "/" +
        inventoryPostingGroup.store_Code
    );
  }

  getChartOfAccount() {
    return this.http.get(this.getChartOfAccountUrl);
  }
  getStore(){
    return this.http.get(this.getStoreurl);
  }
}
