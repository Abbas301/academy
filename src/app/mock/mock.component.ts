import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from 'src/app/calender/calendar/calendar.service';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css']
})

export class MockComponent implements OnInit {
  selectedValue: string;
  batchname:any;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  calendarList: any;
  calendarListData: any;
  batchesDetails: any;
  batch: any;
  mockForm:FormGroup;
  constructor(
    private calendarService: CalendarService,
    private fb:FormBuilder
  ) { }
@ViewChild('reset')reset!:ElementRef
  ngOnInit(): void {
    this.getBatch()
    this.mockForm = this.fb.group({
      mockname:['',[Validators.required]],
      batchname:['',[Validators.required]],
      mocktype:['',[Validators.required]],
      mockdate:['',[Validators.required]]
    })
  }
  postmockData(data:any){
console.log(data.value);

  }

  modalreset(){
    this.reset.nativeElement.click();
  }
  getBatch() {
    this.calendarService.getBatchData().subscribe((res: any) => {
      this.batchesDetails = res;
      this.batch = this.batchesDetails.data;
      console.log(this.batch);
    });
  }

}
