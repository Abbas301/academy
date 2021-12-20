import { Component, OnInit, ViewChild, forwardRef, ElementRef } from '@angular/core';
declare let $: any;
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CalendarService } from './calendar.service';
import { ToastrService } from 'ngx-toastr';

export interface Events {
  id: string;
  title: string;
  start: string;
}
export interface Calendar {
  calendarDetailsId:number;
  batchName:string;
  technology:string;
  include:Array<string>;
  startDate:string
  endDate:string
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions !: CalendarOptions;
  eventsModel: any;
  submitted = false;
  eventdate!: string;
  successdata: any;
  searchText: any;

  calendarData:Events[] =[];
  calendarList: any
  calenderObject:Calendar | undefined;
  Cform!: FormGroup;

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  @ViewChild('modalOpenButton') modalOpenButton!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('generateCalendarModal') generateCalendarModal!:ElementRef
  value: any;
  monthSelect: any
  calendarListData: any;
  calendarEvents: any;
  batchname: any;
  calendarDetailsId: any;
  index: any;

  constructor(private http: HttpClient,
    private calendarService: CalendarService,
    private toastr: ToastrService
  ) { }


  ngOnInit() {

    this.Cform = new FormGroup({
      batchName: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      include: new FormControl('', [Validators.required]),
    })
    this.getCalendarData();
    this.calenderSetup();
    console.log(this.calendarData);

  }

  calenderSetup() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      droppable: true,
      selectable: true,
      eventColor: "#086288",
      eventStartEditable: true,
      eventBackgroundColor: "#fff",
      eventBorderColor: "#fff",
      eventTextColor: "black",
      height: 700,
      contentHeight: 600,
      events: this.calendarData,
    //   customButtons: {
    //     myCustomButton: {
    //     text: 'Add Event',
    //     click: function() {
    //            alert("Custom Button");
    //     }
    //   }
    // },
      // eventContent: { html: '<i class="far fa-edit"></i>' },
      eventContent: function (args:any, createElement:any) {
        const icon = args.event._def.extendedProps.img;
        const text = "<i class='far fa-edit" + icon + "'></i> " + args.event._def.title;
        if(args.icon){
          createElement.find(".fc-title").prepend("<i class='fa fa-edit"+args.icon+"'></i>");
       }
        return {
          html: text
        };
      },
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prevYear,nextYear',
        center: 'title',
        right: 'dayGridMonth prev,next'
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
    }
  }

  handleDateClick(arg: any) {
    this.modalOpenButton.nativeElement.click();
    $(".title").text("Add Event at:" + arg.dateStr);
    $(".eventsstarttitle").text(arg.dateStr);
  }

  handleEventClick(arg: any) {
    console.log(arg);
  }

  handleEventDragStop(arg: any) {
    console.log(arg);
  }

  getCalendarData() {
    return this.calendarService.getCalendar().subscribe((data: any) => {
      this.calendarList = data;
      this.calendarListData = this.calendarList.data
      console.log(this.calendarListData);
    })
  }

  onSubmit(addEventForm: NgForm) {
    console.log(addEventForm.value);
  }

  technologys = [
    { value: 'HTML', viewValue: 'HTML' },
    { value: 'CSS', viewValue: 'CSS' },
    { value: 'Javascript', viewValue: 'Javascript' },
    { value: 'Angular', viewValue: 'Angular' },
  ];

  batches = [
    { value: 'B20DECAN_133658', viewValue: 'B20DECAN_133658' },
    { value: 'B15DECME_105529', viewValue: 'B15DECME_105529' },
    { value: 'B15DECME_105821', viewValue: 'B15DECME_105821' },
    { value: 'B15DECME_105840', viewValue: 'B15DECME_105840' },
  ];

  includes = [
    { value: 'SATURDAY', viewValue: 'SATURDAY' },
    { value: 'SUNDAY', viewValue: 'SUNDAY' },
    { value: 'HOLIDAYS', viewValue: 'HOLIDAYS' },
  ];

  elementData(calendar: Calendar) {
    this.calenderObject = calendar;
    console.log(calendar);
  }
  deleteCalendarData() {
    this.closeBtn.nativeElement.click();
    console.log(this.batchname);

    this.calendarService.deleteCalendar(this.calenderObject?.calendarDetailsId,this.calenderObject?.batchName).subscribe((res: any) => {
      console.log("Calendar list deleted successfully");
      if(res.error == false) {
        this.toastr.success("Calendar list deleted successfully");
      this.getCalendarData();
      }
    },err => {
      console.log("err",err);
      this.toastr.error('some error occured');
      this.toastr.error(err.error.message);
    })
  }

  onSubmitForm(Cform: FormGroup) {
    console.log(this.Cform.value);
    const formData ={
      batchName:Cform.controls.batchName.value,
      technology:Cform.controls.technology.value,
      startDate:Cform.controls.startDate.value,
      include:Cform.controls.include.value,
    }
    this.calendarService.postCalendar(formData).subscribe((res: any) => {
      console.log("calendar Generated Successfully");
      // if(res.error == false) {
        this.toastr.success('calendar Generated Successfully');
        this.getCalendarData();
      // }
      setTimeout(() => {
        this.generateCalendarModal.nativeElement.click();
      },500);
       Cform.reset();
    },err => {
      console.log("err",err);
      this.toastr.error(err.error.message);
      this.toastr.error('some error occured');
    })
  }

  visibleCalender(batchname:any) {
    console.log(batchname);
     this.calendarService.getCalendarEvents(batchname).subscribe(res => {
      this.calendarEvents = res;
      let eventsArray = this.calendarEvents.data;
      console.log(eventsArray);
      var calendarData:any = []
      eventsArray.forEach((element:any,index:any) => {
        let obj = {id:'',title:'',start:'',eventContent:''}
        obj.id = index
        obj.title = element.topic
        obj.start = element.date
        obj.eventContent = element.subTopic
        calendarData.push(obj)
      });

      if(Array.isArray(calendarData) && calendarData.length>0){
        console.log("calendarData",calendarData);
        this.calendarData = calendarData;
        this.calendarOptions.events = calendarData;
        this.calenderSetup()
      }
      else{
        console.log("calendarData",calendarData);
        console.log("Array is empty")
      }
    })
    setTimeout(() => {
      this.calenderSetup()
    }, 500);
  }

  editCalender() {
    setTimeout(() => {
      this.calenderSetup()
    }, 500);
  }

}



