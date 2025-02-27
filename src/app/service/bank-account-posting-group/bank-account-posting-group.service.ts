import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountPostingGroupService {

  public chartOfAccountUrl = environment.rootPath2 + "bscChartOfAccount"; 
  public genbusUrl = environment.rootPath2 + "finance/GenBusPostingGroups";

  public bankAccountPostingGroupUrl =
    environment.rootApiPath + "finance/procBankAccountPostingGroup";

  constructor(private http: HttpClient) {}

  getChartOfAccounts() {
    return this.http.get(this.chartOfAccountUrl);
  }
  getgebus() {
    return this.http.get(this.genbusUrl);
  }

  getBankAccountPostingGroups() {
    return this.http.get(this.bankAccountPostingGroupUrl);
  }

  addBankAccountPostingGroup(bankAccountPostingGroup) {
    return this.http.post(this.bankAccountPostingGroupUrl, bankAccountPostingGroup);
  }

  updateBankAccountPostingGroup(bankAccountPostingGroup) {
    return this.http.put(this.bankAccountPostingGroupUrl, bankAccountPostingGroup);
  }

  deleteBankAccountPostingGroup(bankAccountPostingGroup) {
    return this.http.delete(
      this.bankAccountPostingGroupUrl + "/" + bankAccountPostingGroup.code
    );
  }
}