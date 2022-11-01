import { Component, OnInit } from '@angular/core';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
})
export class OfflineComponent implements OnInit {

  status: OnlineStatusType = this._onlineStatusService.getStatus(); // get initial status

  constructor(private _onlineStatusService: OnlineStatusService) {
    this._onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
    });
  }

  ngOnInit(): void {
  }

  refresh() {
    window.location.reload();
  }
}
