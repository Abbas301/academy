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
    private router: Router
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
    this.calenderSetup();
    this.getBatch();
  }

  technologys = [
    { value: 'JAVA_WITH_ANGULAR', viewValue: 'JAVA_WITH_ANGULAR' },
    { value: 'JAVA_WITH_REACT', viewValue: 'JAVA_WITH_REACT' },
  ];

  event: any;
  calendar: any = [];
  newDate: any;

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
      // dayRender: (info) => {
      //   info.el.innerHTML += "<button class='dayButton' data-date='" + info.date + "'>Click me</button>";
      //   info.el.style.padding = "20px 0 0 10px";
      // },
      contentHeight: 400,
      eventDrop: (info) => {
        let id = info.event.extendedProps.calendarDetailsId;
        // console.log(id);
        this.dateObj = info.event._instance.range.start;
        // console.log(this.dateObj);
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
      // eventContent: {
      //   html: `<p>${this.selectedTitle}</p><p>${this.selectedSubTopic}</p><p>${this.selectedTrainer}</p><button data-target="#myModal" data-toggle="modal">event</button>`,
      // },
      //   dayHeaderContent: (args) => {
      //     return moment(args.date).format('ddd')
      // },
      dayCellDidMount: function (arg) {
        if (arg.el.classList.contains('fc-daygrid-day')) {
          var theElement = arg.el.querySelectorAll(
            '.fc-daygrid-day-frame > .fc-daygrid-day-events'
          )[0];
          setTimeout(function () {
            if (
              theElement.querySelectorAll('.fc-daygrid-event-harness')
                .length === 0
            ) {
              // theElement.innerHTML = theElement.innerHTML +'<div><i data-toggle="modal" data-target="#EditModal" class="fa fa-pencil fa-fw"></i></div><div class="text-center buttonsElement" style="margin-top:10px;"><button style="margin-right:3px;" class="complete btn">Complete</button><button class="pending btn">Pending</button></span></div>';
              theElement.innerHTML =
                theElement.innerHTML +
                `<div><i data-toggle="modal" data-target="#EditModal" class="fa fa-pencil fa-fw"></i></div><div class="text-center buttonsElement" style="margin-top:10px;"><button style="margin-right:3px;" class="complete btn">Complete</button><button class="pending btn">Pending</button></span></div>`;
            }
          }, 10);
        }
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

  alertOpen() {
    console.log('opened modal');

    alert('success');
  }

  newTitle: any;
  newSubTitle: any;
  calendarEventDragged(arg: any) {
    this.calenderSetup();
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

    this.eventsArray.forEach((ele, i) => {
      if (ele?.calendarEventId === calenderObj.calendarEventId) {
        console.log(ele?.calendarEventId);
        console.log(calenderObj.calendarEventId);
        this.eventsArray.splice(i, 1, calenderObj);
      }
    });

    const updateCalendarData = {
      batchName: this.selectedBatchName,
      updatedDates: this.eventsArray,
    };
    console.log(updateCalendarData);

    this.calendarService.updateCalendar(updateCalendarData).subscribe((res:any) => {
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
  // eventClick(event) {
  //   console.log(event);
  // }

  handleDateClick(arg: any) {
    console.log(arg);

    // console.log(arg);
    // this.getUpdateEventDate();
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
    console.log(this.eventsArray);

    this.eventsArray.forEach((ele, i) => {
      if (ele?.calendarEventId === calenderObj.calendarEventId) {
        console.log(ele?.calendarEventId);
        console.log(calenderObj.calendarEventId);
        this.eventsArray.splice(i, 1, calenderObj);
      }
    });

    const updateCalendarData = {
      batchName: this.selectedBatchName,
      updatedDates: this.eventsArray,
    };
    console.log(updateCalendarData);

    this.calendarService.updateCalendar(updateCalendarData).subscribe((res:any) => {
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

  elementData(calendar: Calendar) {
    this.calenderObject = calendar;
    console.log(calendar);
  }
  deleteCalendarData() {
    this.closeBtn.nativeElement.click();
    console.log(this.batchname);

    this.calendarService.deleteCalendar(
        this.calenderObject?.calendarDetailsId,
        this.calenderObject?.batchName
      ).subscribe((res: any) => {
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
      // console.log(this.eventsArray,'events');

      var calendarData: any = [];
      this.eventsArray[0].forEach((element: any, index: any) => {
        let obj = {
          calendarEventId: '',
          title: '',
          start: '',
          subTopic: '',
          calendarDetailsId: '',
          day: '',
          progressStatus: '',
        };
        obj.calendarEventId = element.calendarEventId;
        obj.title = element.topic;
        obj.start = element.date;
        obj.subTopic = element.subTopic;
        obj.calendarDetailsId = element.calendarEventId;
        obj.day = element.day;
        obj.progressStatus = element.progressStatus;
        calendarData.push(obj);
      });
      console.log(calendarData);
      this.eventsArray = this.eventsArray[0];
      console.log(this.eventsArray);

      this.CalendarId = this.eventsArray[0].calendarEventId;
      console.log(this.calendarId);

      this.selectedTitle = calendarData[index].title;
      this.selectedSubTopic = calendarData[index].subTopic;
      // console.log(this.selectedSubTopic);

      if (Array.isArray(calendarData) && calendarData.length > 0) {
        this.calendarData = calendarData;
        this.calendarOptions.events = calendarData;
        this.calenderSetup();
      } else {
        console.log('Array is empty');
      }
      this.getAllCandidates();
    });

    setTimeout(() => {
      this.calenderSetup();
    }, 1000);
  }

  editCalender(row) {
    setTimeout(() => {
      this.calenderSetup();
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
    this.calendarService
      .getEventByDate(this.selectedBatchName, this.selectedDate)
      .subscribe((res: any) => {
        this.GetEvent = res;
        this.clickDay = this.GetEvent.data.day;
        this.clickProgress = this.GetEvent.data.progressStatus;

        this.addEventForm.get('title').patchValue(res?.data?.topic);
        this.addEventForm.get('subTopic').patchValue(res?.data?.subTopic);
      });
  }
}
