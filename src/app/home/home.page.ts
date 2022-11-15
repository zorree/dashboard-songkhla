import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { io } from "socket.io-client";
// const socket = io("http://192.168.43.224:3040/");
// const socket = io("http://192.168.1.75:3040/");
// const socket = io("http://192.168.208.226:3040/");
// const socket = io("http://192.168.15.245:3040/");
const socket = io("http://192.168.227.226:3040/");


// export interface Data {
//   id: number;
//   did: number
//   hn: number;
//   name: string;
//   lname: string;
//   status: string;
// }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private platform: Platform
  ) {
    socket.on('data', (data) => {
      console.log(data)
      this.data[data[0].id - 1].id = data[0].id
      this.data[data[0].id - 1].did = data[0].did
      this.data[data[0].id - 1].hn = data[0].hn
      this.data[data[0].id - 1].name = data[0].firstname
      this.data[data[0].id - 1].lname = data[0].lastname
      this.data[data[0].id - 1].status = this.status[data[0].status]
      // for (let i = 0; i < data.length; i++) {
      //   console.log(this.data[i].id = data[i].id)
      // }
      // this.data[data.tid].id = data.id
      // this.data[data.tid].hn = data.hn
      // this.data[data.tid].name = data.name
      // this.data[data.tid].lname = data.lname
      // this.data[data.tid].status = this.status[data.status]
    })
  }

  status = ['', 'รับเข้าระบบแล้ว', 'กำลังจัดยา', 'กำลังตรวจสอบความถูกต้อง', 'อยู่ในสายพานเตรียมจ่าย', 'เตรียมจ่ายยา']
  // status_color = ['', 'red', 'green', 'blue', 'yellow', 'white']

  title = 'Realtime App'


  // state_id  |  state_name   |  state_description   | state_color 
  // ----------+---------------+----------------------+-------------
  //         8 | CHECKIN CLEAR | ล้างตะกร้า             | #FA1E44
  //         6 | CHECKOUT      | จ่ายยาแล้ว             | #C7CEEA
  //         7 | CANCEL        | ยกเลิก                | #FA1E44
  //         5 | PREPARE       | เตรียมจ่ายยา           | #5AB190
  //         3 | DOUBLE CHECK  | กำลังตรวจสอบความถูกต้อง | #88D840
  //         1 | CHECKIN       | รับเข้าระบบแล้ว         | #FFB7B2
  //         2 | STATION       | กำลังจัดยา             | #FEC925
  //         4 | ROBOT         | อยู่ในสายพานเตรียมจ่าย   | #E2F0CB


  // data: Data[] = [
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[1] },
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[2] },
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[3] },
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[4] },
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[5] },
  // ]


  // data = [
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[1], status_color:'#FA1E44'},
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[2], status_color:'#FEC925' },
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[3], status_color:'#88D840' },
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[4], status_color:'#E2F0CB' },
  //   { id: 0, did: 0, hn: 0, name: 'xx', lname: 'xx', status: this.status[5], status_color:'#5AB190' },
  // ]

  new:any

  data: any

  day: any;
  days: any;
  month: any;
  year: any;
  times: any;

  dataww: any;

  time = new Date()
  thday = new Array("อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์");
  thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
  timecal = "วัน" + this.thday[this.time.getDay()] + "ที่ " + this.time.getDate() + " " + this.thmonth[this.time.getMonth()] + " " + (this.time.getFullYear() + 543) + " เวลา " + this.time.toLocaleTimeString('it-IT')

  backbt
  ngAfterViewInit() {
    this.backbt = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp()
    })
  }
  ngOnDestroy() {
    this.backbt.unsubscribe()
  }
  ngOnInit(): void {

    socket.emit('select')

    socket.on('news', (data) => {
      console.log(data)
      this.new = data;
    })

    socket.on('day', (data) => {
      // console.log(data)
      this.day = data
    })
    socket.on('days', (data) => {
      // console.log(data)
      this.days = data
    })
    socket.on('month', (data) => {
      // console.log(data)
      this.month = data
    })
    socket.on('year', (data) => {
      // console.log(data)
      this.year = data
    })
    socket.on('time', (data) => {
      // console.log(data)
      this.times = data
    })

    socket.on('order_transaction_head_5000', (data) => {
      this.data = data.reverse();
    })

    // socket.on('order_transaction_head_8000', (data) => {
    //   this.data = data.reverse();
    // })

    socket.on('select', (data) => {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        this.data[i].id = data[i].id
        this.data[i].did = data[i].did
        this.data[i].hn = data[i].hn
        this.data[i].name = data[i].firstname
        this.data[i].lname = data[i].lastname
        this.data[i].status = this.status[data[i].status]
      }
    })

    setInterval(() => {
      this.time = new Date();
      this.timecal = "วัน" + this.thday[this.time.getDay()] + "ที่ " + this.time.getDate() + " " + this.thmonth[this.time.getMonth()] + " " + (this.time.getFullYear() + 543) + " เวลา " + this.time.toLocaleTimeString('it-IT')
      // console.log("วัน" + this.thday[this.time.getDay()] + "ที่ " + this.time.getDate() + " " + this.thmonth[this.time.getMonth()] + " " + (this.time.getFullYear() + 543) + " เวลา " + this.time.toLocaleTimeString('it-IT'))
    }, 1000);

    setInterval(() => {
      this.data;
    }, 100);
  }

}
