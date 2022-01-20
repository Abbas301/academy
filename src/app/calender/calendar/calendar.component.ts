import {
  Component,
  OnInit,
  ViewChild,
  forwardRef,
  ElementRef,
  TemplateRef,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
} from '@angular/core';
declare let $: any;
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CalendarService } from './calendar.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MatCardTitleGroup } from '@angular/material/card';
import { of } from 'rxjs';

export interface Events {
  date: string;
  topic: string;
  subTopic: string;
}
export interface Calendar {
  calendarDetailsId: number;
  batchName: string;
  technology: string;
  include: Array<string>;
  startDate: string;
  endDate: string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarOptions!: CalendarOptions;
  eventsModel: any;
  submitted = false;
  eventdate!: string;
  successdata: any;
  searchText: any;

  // calendarData: Events[] = [];
  calendarData: any = [];
  calendarList: any;
  calenderObject: Calendar | undefined;
  Cform!: FormGroup;
  selected = '';
  addEventForm: FormGroup;
  editEventForm: FormGroup;
  element: any;

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  @ViewChild('modalOpenButton', { read: ElementRef })
  modalOpenButton!: ElementRef;
  @ViewChild('editModalOpen', { read: ElementRef }) editModalOpen!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('generateCalendarModal') generateCalendarModal!: ElementRef;
  @ViewChild('resetButton') resetButton!: ElementRef;
  @ViewChild('my_button') my_button!: ElementRef;
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('closeModal', { read: ElementRef }) closeModal!: ElementRef;
  @ViewChild('fcEventContent') eventContent: TemplateRef<any>;
  value: any;
  monthSelect: any;
  calendarListData: any;
  calendarEvents: any;
  batchname: any;
  calendarDetailsId: any;
  batchesDetails: any;
  batch: any;
  selectedBatchName: any;
  selectedTechnology: any;
  selectedStartDate: any;
  selectedEndDate: any;
  start: Date;
  eventsArray: any[] = [];
  EventsArrayData: any[];
  CalendarId: any;
  calendarId: any;
  batchName: any;
  candidateList = [];
  candidates: any;
  selectedTrainer: any;
  dateObj: Date;
  toStoreDate: any;
  selectedDate: any;
  isloading: boolean = false;

  constructor(
    private http: HttpClient,
    private calendarService: CalendarService,
    private toastr: ToastrService,
    private router: Router ,
    private elementRef:ElementRef
  ) {}

  ngOnInit() {
    this.Cform = new FormGroup({
      batchName: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      include: new FormControl('', [Validators.required]),
    });

    this.addEventForm = new FormGroup({
      start: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      subTopic: new FormControl('', [Validators.required]),
    });
    this.getCalendarData();
    this.calendarSetup();
    this.getBatch();

  }

  technologys = [
    { value: 'JAVA_WITH_ANGULAR', viewValue: 'JAVA_WITH_ANGULAR' },
    { value: 'JAVA_WITH_REACT', viewValue: 'JAVA_WITH_REACT' },
  ];

  event: any;
  calendar: any = [];
  newDate: any;
  flag:Boolean = false;

  calendarSetup() {
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

        let title = document.createElement('div');
        let subTopic = document.createElement('div');
        let trainer = document.createElement('div');
        let complete = document.createElement('button');
        let pending = document.createElement('button');
        // let success = document.createElement('button');
        complete.innerHTML = "complete"
        complete.id = "Completed_btn"
        complete.className = "completed btn"
        // let fail = document.createElement('button');
        pending.innerHTML = "pending";
        pending.className = "pendings btn";

            //  complete.append(success)
            //  pending.append(fail)
          title.innerHTML = arg.event.title;
          subTopic.innerHTML = arg.event.extendedProps.subTopic;
          trainer.innerHTML = this.selectedTrainer;
          // if(this.flag === false){
          //   console.log("Completed");
          //   complete.innerHTML = `<button>Completed</button>`;
          //   pending.innerHTML = `<button>Pending</button>`;
          // }else {
          //   console.log("Pending");
          //   complete.innerHTML = `<button>success</button>`;
          // }

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
          console.log(progressData);

          var x = document.getElementById("myDIV");
          if (x.innerHTML === "Completed") {
            x.innerHTML = "Success";
          } else {
            x.innerHTML = "Completed";
          }

          // alert(this.flag)
          // this.calendarService.postBatchProgress(progressData).subscribe((res:any)=>{
          //   if(!res.error) {
          //     console.log(res);
          //   this.toastr.success(res.message);
          //   } else {
          //     this.router.navigate(['/', 'calendar']);
          //   }
          // },
          // err => {
          //   this.toastr.error(err.error.message)
          // })
          // this.my_button.nativeElement.addEventListener('click', this.openAlert());

        })
        let arrayOfDomNodes = [title,subTopic,trainer,complete,pending];
        return {domNodes:arrayOfDomNodes}
      },
      // dayCellDidMount: function (arg) {
      //   if (arg.el.classList.contains('fc-daygrid-day')) {
      //     var theElement = arg.el.querySelectorAll('.fc-daygrid-day-frame > .fc-daygrid-day-events')[0];
      //     setTimeout(function () {
      //       if (theElement.querySelectorAll('.fc-daygrid-event-harness').length == 0) {
      //         theElement.innerHTML =
      //           theElement.innerHTML +
      //           `<div><i data-toggle="modal" data-target="#EditModal" class="fa fa-pencil fa-fw"></i></div><div class="text-center buttonsElement" style="margin-top:10px;"><button style="margin-right:3px;" class="complete btn">Complete</button><button class="pending btn">Pending</button></span></div>`;
      //       }
      //     }, 10);
      //   }
      // },
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

  // ngAfterViewChecked (){
  //   if(this.my_button){
  //     this.my_button.nativeElement.addEventListener('click', this.openAlert);
  //   }
  // }

  // openAlert() {
  //   alert("hello")
  // }
  newTitle: any;
  newSubTitle: any;
  calendarEventDragged(arg: any) {
    this.calendarSetup();
    let id = arg.event.extendedProps.calendarDetailsId;
    let newTitle = arg.event._def.title;
    let newSubTopic = arg.event.extendedProps.subTopic;
    let newDay = arg.event.extendedProps.day;
    let ProgressStatus = arg.event.extendedProps.progressStatus;
    // console.log(arg.event);

    let calenderObj = {
      calendarEventId: id,
      date: this.toStoreDate,
      day: newDay,
      status: 'WORKING',
      description: 'holiday',
      batchName: this.selectedBatchName,
      topic: newTitle,
      subTopic: newSubTopic,
      progressStatus: ProgressStatus,
    };
    console.log(this.eventsArray);

    this.eventsArray[0].forEach((ele, i) => {
      if (ele?.calendarEventId === calenderObj.calendarEventId) {
        console.log(ele?.calendarEventId);
        console.log(calenderObj.calendarEventId);
        this.eventsArray[0].splice(i, 1, calenderObj);
      }
    });

    const updateCalendarData = {
      batchName: this.selectedBatchName,
      updatedDates: this.eventsArray[0],
    };
    console.log(updateCalendarData);

    this.calendarService.updateCalendar(updateCalendarData).subscribe(
      (res: any) => {
        if (res.error == false) {
          this.toastr.success('Calendar Data updated Successfully');
          this.closeModal.nativeElement.click();
        } else {
          this.router.navigate(['/', 'calendar']);
        }
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  changeEvents(event) {
    console.log(event, 'event');
  }

  handleDateClick(arg: any) {
    this.modalOpenButton.nativeElement.click();
    $('.Modaltitle').text('Add Event at:' + arg.dateStr);
    $('.eventsstarttitle').text(arg.dateStr);
    this.addEventForm.get('start').patchValue(arg.dateStr);
    // this.handleEventClick(arg);
    this.selectedDate = arg.dateStr;
    console.log(this.selectedDate);
    this.getUpdateEventDate();
  }

  handleEventClick(element: Events) {
    // console.log(element);
    // this.editModalOpen.nativeElement.click();
  }

  handleEventDragStop(arg: any) {
    setTimeout(() => {
      this.calendarEventDragged(arg);
    }, 1000);
  }

  getCalendarData() {
    return this.calendarService.getCalendar().subscribe((data: any) => {
      this.calendarList = data;
      this.calendarListData = this.calendarList.data;
      this.batchName = this.calendarListData[0].batchName;
    });
  }

  onSubmit(addEventForm: FormGroup) {
    let date = new Date(addEventForm.controls.start.value);
    var dateObj = new Date(date);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');
    let calenderObj = {
      calendarEventId: this.CalendarId,
      date: momentString,
      day: this.clickDay,
      status: 'WORKING',
      description: 'holiday',
      batchName: this.selectedBatchName,
      topic: addEventForm.controls.title.value,
      subTopic: addEventForm.controls.subTopic.value,
      progressStatus: this.clickProgress,
    };

    this.eventsArray[0].forEach((ele, i) => {
      if (ele?.calendarEventId === calenderObj.calendarEventId) {
        console.log(ele?.calendarEventId);
        console.log(calenderObj.calendarEventId);
        this.eventsArray[0].splice(i, 1, calenderObj);
      }
    });

    const updateCalendarData = {
      batchName: this.selectedBatchName,
      updatedDates: this.eventsArray[0],
    };
    // console.log(updateCalendarData);
    this.calendarService.updateCalendar(updateCalendarData).subscribe(
      (res) => {
        this.toastr.success('Calendar Data updated Successfully');
        this.closeModal.nativeElement.click();
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  elementData(calendar: Calendar) {
    this.calenderObject = calendar;
    console.log(calendar);
  }
  deleteCalendarData() {
    this.closeBtn.nativeElement.click();
    console.log(this.batchname);

    this.calendarService
      .deleteCalendar(
        this.calenderObject?.calendarDetailsId,
        this.calenderObject?.batchName
      )
      .subscribe(
        (res: any) => {
          console.log('Calendar list deleted successfully');
          if (res.error == false) {
            this.toastr.success('Calendar list deleted successfully');
            this.getCalendarData();
          } else {
            this.router.navigate(['/', 'calendar']);
          }
        },
        (err) => {
          console.log('err', err);
          this.toastr.error(err.error.message);
        }
      );
  }

  onSubmitForm(Cform: FormGroup) {
    let date = new Date(Cform.controls.startDate.value);
    console.log(date);
    var dateObj = new Date(date);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format('YYYY-MM-DD');

    const formData = {
      batchName: Cform.controls.batchName.value,
      technology: Cform.controls.technology.value,
      startDate: momentString,
      include: Cform.controls.include.value,
    };
    this.isloading = true;
    this.calendarService.postCalendar(formData).subscribe(
      (res: any) => {
        console.log('calendar Generated Successfully');
        this.toastr.success('calendar Generated Successfully');
        this.resetButton.nativeElement.click();
        this.getCalendarData();
        setTimeout(() => {
          this.generateCalendarModal.nativeElement.click();
        }, 500);
        Cform.reset();
        this.isloading = false;
      },
      (err) => {
        console.log('err', err);
        this.toastr.error(err.error.message);
      }
    );
  }

  selectedTitle;
  selectedSubTopic;
  visibleCalender(batchName: any, index: any) {
    this.selectedBatchName = batchName;
    this.selectedTechnology = this.calendarListData[index].technology;
    this.selectedStartDate = this.calendarListData[index].startDate;
    this.selectedEndDate = this.calendarListData[index].endDate;

    this.calendarService.getCalendarEvents(batchName).subscribe((res) => {
      this.calendarEvents = res;
      this.eventsArray.push(this.calendarEvents.data);
      console.log(this.eventsArray, 'events');

      var calendarData: any = [];
      this.eventsArray[0].forEach((element: any, index: any) => {
        let obj = {
          calendarEventId: '',
          title: '',
          start: '',
          subTopic: '',
          calendarDetailsId: '',
        };
        obj.calendarEventId = element.calendarEventId;
        obj.title = element.topic;
        obj.start = element.date;
        obj.subTopic = element.subTopic;
        obj.calendarDetailsId = element.calendarEventId;
        calendarData.push(obj);
      });
      console.log(calendarData);
      calendarData.map((ele,index) => {
        // if(calendarData.index == index) {
        this.selectedTitle = ele?.title;
        this.selectedSubTopic = ele?.subTopic;
        // console.log(ele?.title);
        // console.log(ele?.subTopic);
        for(let i=0;i< ele.length;i++) {
          console.log(ele[i].title);

        }
        // }
      });

      if (Array.isArray(calendarData) && calendarData.length > 0) {
        this.calendarData = calendarData;
        // this.calendarOptions.events = this.calendarData;
        this.calendarSetup();
      } else {
        console.log('Array is empty');
      }
      this.getAllCandidates();
    console.log(this.calendarOptions);

    });

    setTimeout(() => {
      this.calendarSetup();
    }, 1000);
  }

  editCalender(row) {
    setTimeout(() => {
      this.calendarSetup();
    }, 500);
  }

  getBatch() {
    this.calendarService.getBatchData().subscribe((res: any) => {
      this.batchesDetails = res;
      this.batch = this.batchesDetails.data;
    });
  }

  onChangeBatchName(event: any, Cform: FormGroup) {
    this.batch.forEach((ele) => {
      if (ele.batchName === event.value) {
        Cform.patchValue({
          technology: ele.technology,
          startDate: ele.startDate,
        });
      }
    });
  }

  getAllCandidates() {
    this.calendarService.getSingleBatch(this.selectedBatchName).subscribe((res) => {
        this.candidateList = res['data'][0].assignTrainerList;
        const trainer = [];
        for (var i = 0; i <= this.candidateList.length; i++) {
          trainer.push(this.candidateList[i]?.assignTrainerName);
          this.selectedTrainer = trainer;
        }
      });
  }

  GetEvent: any;
  clickDay: any;
  clickProgress: any;
  getUpdateEventDate() {
    this.calendarService.getEventByDate(this.selectedBatchName, this.selectedDate).subscribe((res: any) => {
        this.GetEvent = res;
        this.CalendarId = this.GetEvent.data.calendarEventId;
        this.clickDay = this.GetEvent.data.day;
        this.clickProgress = this.GetEvent.data.progressStatus;

        this.addEventForm.get('title').patchValue(res?.data?.topic);
        this.addEventForm.get('subTopic').patchValue(res?.data?.subTopic);
      });
  }

  batchProgress(){
    const progressData ={
      batchName:this.selectedBatchName,
      progressStatus:'COMPLETED',
      noOfWorkingDays:42,
      date:this.selectedDate
    }
    console.log(progressData);

  //   this.calendarService.postBatchProgress(progressData).subscribe((res)=>{
  //     console.log(res);
  //     this.toastr.success(res.message)
  //   },
  //   err => {
  //     this.toastr.error(err.error.message)
  //   })
  }

}


