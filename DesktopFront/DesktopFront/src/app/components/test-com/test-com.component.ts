import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-test-com',
  templateUrl: './test-com.component.html',
  styleUrls: ['./test-com.component.css'],
})
export class TestComComponent implements OnInit {
  constructor(private _apiService: ApiClientService) {}

  ngOnInit(): void {
    this.testTask();
  }
  async testTask() {
    let data = await this._apiService.testGet();
    console.log(data);
  }
}
