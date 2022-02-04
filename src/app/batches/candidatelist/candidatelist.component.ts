import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { data } from 'jquery';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { MatCheckbox } from '@angular/material/checkbox';
// calendar
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';

export interface Details {
  candidateName: string;
  phoneNumber: string;
  emailId: string;
  degree: string;
  stream: string;
  yop: string;
  degreeAggregate: string;
  branch: string;
  candidateId: string;
  tenthPercentage: string
  twelfthPercentage: string
  masterAggregate: string
  profileId: string;
  batchName: string;
}

@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent implements OnInit {
  [x: string]: any;

  details: any = []
  Cform !: FormGroup;
  index !: number;
  candidates: any;
  id: any;
  batchName: any;
  batchType: any;
  calendarOptions !: CalendarOptions;

  @ViewChild('modalOpenButton') modalOpenButton!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('candidateModalClose') candidateModalClose!: ElementRef;
  @ViewChild('confirm') confirm!: ElementRef;
  @ViewChild('headerCheckbox') headerCheckbox!: MatCheckbox;

  displayedColumns: string[] = ['select', 'candidateName', 'phoneNumber', 'emailId', 'degree', 'stream', 'yop', 'degreeAggregate', 'branch', 'deleteEmployee'];
  dataSource = new MatTableDataSource<Details>();
  selection = new SelectionModel<Details>(true, []);
  deleteElement = [];
  CandidateListData: any;
  array: any[] = [];
  selectedBatchName: any;
  selectedTechnology: any;
  selectedStartDate: any;
  selectedEndDate: any;
  calendarListData: any;
  calendarList: any;
  calendarEvents: Object;
  eventsArray: any;
  calendarData: any[];
  CalendarId: any;
  candidateList: any;
  candidateId: string;


  constructor(private router: Router,
    private ActivatedRouter: ActivatedRoute,
    private batchService: BatchService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ActivatedRouter.queryParams.subscribe(params => {
        this.batchName = params.batchName;
      });

    this.Cform = new FormGroup({
      candidateId: new FormControl(''),
      batchName: new FormControl(''),
      candidateName: new FormControl(''),
      phoneNumber: new FormControl(''),
      emailId: new FormControl(''),
      degree: new FormControl(''),
      tenthPercentage: new FormControl(''),
      twelfthPercentage: new FormControl(''),
      stream: new FormControl(''),
      yop: new FormControl(''),
      masterAggregate: new FormControl(''),
      degreeAggregate: new FormControl(''),
      branch: new FormControl(''),
      profileId: new FormControl(''),
    })

    this.getAllCandidates()
    this.calenderSetup();
    this.getCalendarData();
    console.log(this.calendarListData);

  }

  branches = [
    { value: 'Hebbal', viewValue: 'Hebbal' },
    { value: 'BTM', viewValue: 'BTM' },
    { value: 'BasavanaGudi', viewValue: 'BasavanaGudi' },
  ];

  viewCandidate(index: number) {
    this.router.navigate(['/candidate/'],
      {
        queryParams: {
          batchName: this.batchName,
          batchId: this.candidates.batchId
        }
      })
  }

  getAllCandidates() {
    this.candidateList = [];
    this.batchService.getSingleBatch(this.batchName).subscribe(res => {
      this.candidateList = res;
      // console.log(this.candidateList);
      this.candidates = this.candidateList.data[0];
      // console.log(this.candidates, 'candidates');
      this.details = this.candidateList.data[0].candidateList;
      console.log(this.details);
      setTimeout(() => {
        this.dataSource.data = this.details;
        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      }, 500);
    });
  }

  updateCandidate(element: Details) {
    this.modalOpenButton.nativeElement.click();
    this.candidateId = element.candidateId
    this.Cform.patchValue({
      candidateId: element?.candidateId,
      candidateName: element?.candidateName,
      phoneNumber: element?.phoneNumber,
      emailId: element?.emailId,
      degree: element?.degree,
      tenthPercentage: element?.tenthPercentage,
      twelfthPercentage: element?.twelfthPercentage,
      stream: element?.stream,
      yop: element?.yop,
      profileId: element?.profileId,
      masterAggregate: element?.masterAggregate,
      degreeAggregate: element?.degreeAggregate,
      branch: element?.branch,
      batchName: element?.batchName,
    })
  }
  onClickUpdate() {
    let updateFormData = {
      candidateId: (this.Cform.get('candidateId') as FormControl).value,
      candidateName: (this.Cform.get('candidateName') as FormControl).value,
      emailId: (this.Cform.get('emailId') as FormControl).value,
      stream: (this.Cform.get('stream') as FormControl).value,
      tenthPercentage: (this.Cform.get('tenthPercentage') as FormControl).value,
      degreeAggregate: (this.Cform.get('degreeAggregate') as FormControl).value,
      branch: (this.Cform.get('branch') as FormControl).value,
      phoneNumber: (this.Cform.get('phoneNumber') as FormControl).value,
      degree: (this.Cform.get('degree') as FormControl).value,
      yop: (this.Cform.get('yop') as FormControl).value,
      twelfthPercentage: (this.Cform.get('twelfthPercentage') as FormControl).value,
      masterAggregate: (this.Cform.get('masterAggregate') as FormControl).value,
      profileId: (this.Cform.get('profileId') as FormControl).value,
      batchName: (this.Cform.get('batchName') as FormControl).value,
    }
    this.batchService.updatedCandidate(updateFormData).subscribe((res: any) => {
      console.log("candidate details updated successfully");
      if (res.error == false) {
        this.toastr.success('Candidate details updated successfully');
        this.candidateModalClose.nativeElement.click();
        this.getAllCandidates();
      }
      else {
        this.candidateModalClose.nativeElement.click();
      }
    }, err => {
      console.log('err', err);
      this.toastr.error(err.error.message);
    })

  }

  deleteConfirm(element: any) {
    console.log(element)
    if(this.isAllSelected()){
      this.deleteElement = this.dataSource.data
    }
    else if(Array.isArray(element)){
      this.deleteElement = element;
    }
    else{
      this.deleteElement.push(element);
    }
    // console.log(this.deleteElement)
  }
  deleteCandidate() {
    this.closeBtn.nativeElement.click();
    console.log(this.deleteElement);

    const formData = this.deleteElement;
    console.log(formData);

    this.batchService.deleteCandidateData(formData).subscribe((res: any) => {
      if (res.error == false) {
        // this.deleteElement.shift();
        console.log("candidate data deleted successfully");
        this.toastr.success('Candidate details Deleted successfully');
        this.confirm.nativeElement.click();
        this.getAllCandidates();
      } else {
        this.router.navigate(['/candidatelist/']);
      }
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message);
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Details): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.candidateName + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectedCandidates(row: any) {
    this.array.push(row);
    console.log(this.array);
  }

  remove(row: any) {
    var ArrayData = this.array.splice(this.array.indexOf(row), 1);
    // console.log(ArrayData);
  }

  buttonShow = false;
  buttonHide = true;
  visibleButton() {
    this.buttonShow = !this.buttonShow;
  }

  getCalendarData() {
    return this.batchService.getCalendar().subscribe(data => {
      this.calendarList = data;
      this.calendarListData = this.calendarList.data
      // console.log(this.calendarListData);
    })
  }


  calenderSetup() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      droppable: true,
      selectable: true,
      eventColor: '#086288',
      eventStartEditable: true,
      eventBackgroundColor: '#fff',
      eventBorderColor: '#fff',
      eventTextColor: 'black',
      height: 800,
      contentHeight: 400,
      eventDrop: (info) => {
        let id = info.event.extendedProps.calendarDetailsId;
        this.dateObj = info.event._instance.range.start;
        let year = this.dateObj.getFullYear();
        let month = this.dateObj.getMonth();
        let monthNumber = month + 1;
        let date = this.dateObj.getDate();

        let paddedMonth = monthNumber.toString();
        if (paddedMonth.length < 2) {
          paddedMonth = '0' + paddedMonth;
        }
        let paddedDate = date.toString();
        if (paddedDate.length < 2) {
          paddedDate = '0' + paddedDate;
        }
        this.toStoreDate = `${year}-${paddedMonth}-${paddedDate}`;
        console.log('toStoreDate', this.toStoreDate);
      },
      events: this.calendarData,
      eventContent:(arg)=>{

        let edit = document.createElement('img');
        let title = document.createElement('div');
        let subTopic = document.createElement('div');
        let trainer = document.createElement('div');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        let icon1 = document.createElement('img');
        let icon2 = document.createElement('img');
        let complete = document.createElement('button');
        let pending = document.createElement('button');

        span1.append(complete)
        span2.append(pending)
        edit.src = '../../../assets/edit.png';
        edit.className = 'icon_edit';
        icon1.src = '../../../assets/check.jpg';
        icon1.className = 'icon_check';
        icon2.src = "../../../assets/cancel.png";
        icon2.className = 'icon_check';
        complete.innerText = "complete"
        complete.id = "Completed_btn"
        complete.className = "completed btn"
        pending.innerText = "pending";
        pending.className = "pendings btn";


          title.innerHTML = arg.event.title;
          subTopic.innerHTML = arg.event.extendedProps.subTopic;
          trainer.innerHTML = this.selectedTrainer;

        title.style.fontWeight = 'bold';
        title.style.color = 'blue';
        trainer.style.color = 'red';
        complete.addEventListener('click',()=>{
          let date = new Date(arg.event._instance.range.start);
          var dateObj = new Date(date);
          var momentObj = moment(dateObj);
          var momentString = momentObj.format('YYYY-MM-DD');

          const progressData ={
            batchName:this.selectedBatchName,
            progressStatus:'COMPLETED',
            noOfWorkingDays:42,
            date:momentString
          }
          // console.log(progressData);
          // console.log(span1);

         span1.removeChild(complete);
         span2.removeChild(pending);
         span1.append(icon1)

          this.calendarService.postBatchProgress(progressData).subscribe((res:any)=>{
            if(!res.error) {
            this.toastr.success(res.message);
            } else {
              this.router.navigate(['/', 'calendar']);
            }
          },
          err => {
            this.toastr.error(err.error.message)
          })

        });

        pending.addEventListener('click',()=>{
          span1.removeChild(complete);
          span2.removeChild(pending);
          span2.append(icon2)
        })
        let arrayOfDomNodes = [edit,title,subTopic,trainer,span1,span2];
        return {domNodes:arrayOfDomNodes}
      },
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prevYear,nextYear',
        center: 'title',
        right: 'dayGridMonth prev,next',
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
    };
  }
  handleDateClick(arg:any) {
    console.log(arg);

  }
  handleEventClick(arg:any) {
    console.log(arg);

  }
  handleEventDragStop(arg:any) {
    console.log(arg);

  }

  selectedTitle:any;
  selectedSubTopic:any;
  visibleCalender(batchName: any) {
    console.log(batchName);

    this.selectedBatchName = batchName;
    // if(batchName == )


    this.batchService.getCalendarEvents(batchName).subscribe(res => {
      this.calendarEvents = res['data'];
      this.eventsArray = this.calendarEvents;
      var calendarData: any = []
      this.eventsArray.forEach((element: any, index: any) => {
        let obj = { id: '', title: '', start: '', subTopic: '', calendarDetailsId: '' }
        obj.id = index
        obj.title = element.topic
        obj.start = element.date
        obj.subTopic = element.subTopic
        obj.calendarDetailsId = element.calendarEventId
        calendarData.push(obj)
        // console.log(calendarData[index].title);
        this.selectedTitle = calendarData[index].title;
        this.selectedSubTopic = calendarData[index].subTopic;

      });
      if (Array.isArray(calendarData) && calendarData.length > 0) {
        // console.log("calendarData", calendarData);
        this.calendarData = calendarData;
        this.calendarOptions.events = calendarData;
        this.calenderSetup()
      }
      else {
        // console.log("calendarData", calendarData);
        console.log("Array is empty")
      }
      this.getAllDetails();
    })
    setTimeout(() => {
      this.calenderSetup();
    },500);
  }

  getAllDetails() {
    // console.log(this.selectedBatchName);
    this.batchService.getSingleCalendarBatch(this.selectedBatchName).subscribe(res => {
      this.candidateList = res['data'][0].assignTrainerList;
      console.log(this.candidateList);
      const trainer = [];
      for(var i=0 ; i <= this.candidateList.length;i++) {
            trainer.push(this.candidateList[i]?.assignTrainerName);
            this.selectedTrainer = trainer;
            // console.log(this.selectedTrainer);
      }
    });
  }

}



