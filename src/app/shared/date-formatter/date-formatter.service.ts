import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor() { }

  // Attaching a new function  formatDate()  to any instance of Date() class
  // tslint:disable-next-line: typedef
  formatDate(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const month = [
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER',
      ][myDate.getMonth()];
      const str = myDate.getDate() + ' ' + month + ' ' + myDate.getFullYear();
      return str;
    }
    return '';
  }

  // tslint:disable-next-line: typedef
  formatDay(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const str = myDate.getDate();
      return str;
    }
    return '';
  }

  // tslint:disable-next-line: typedef
  formatMonth(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const month = [
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER',
      ][myDate.getMonth()];
      const str = month;
      return str;
    }
    return '';
  }

  // tslint:disable-next-line: typedef
  formatYear(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const str = myDate.getFullYear();
      return str;
    }
    return '';
  }
}
