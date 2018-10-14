import Moment from 'moment';

class Calender {

  static getDaysForMonthAndYear({month, year}) {
    month = Number.parseInt(month);
    year = Number.parseInt(year);

    let daysCount = this.getNumberOfDaysInMonthAndYear({month, year});

    let days = [];

    for (let i = 1 ; i <= daysCount ; i++){
      let day = new Day({date:i, month, year});
      days.push(day);
    }

    return days;
  }

  static getMonthsForYear({year}) {
    let months = [];
    for (let i = 1 ; i <= 12 ; i++){
      let month = new Month(i, year);
      months.push(month);
    }
    return months;
  }

  static getNumberOfDaysInMonthAndYear({month, year}) {
    if (month === 2 && year % 4 === 0 )
      return 29;
    if (month ===2)
      return 28;

    if ([1,3,5,7,8,10,12].includes(month))
      return 31;

    return 30;
  }
  static getMonthName = (monthNumber) => {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'][Number.parseInt(monthNumber)]
  }


}


class Day {

  date;
  month;
  year;
  name;

  constructor({date, month, year}){
    this.date = date;
    this.month = month;
    this.year = year;
    this.name = Moment(`${year} ${month} ${date}`, 'YYYY MM DD').format('dddd'); // Saturday
  }

  getFormatDate(){  // YYYY-MM-DD
    return Moment(`${this.year}-${this.month}-${this.date}`, 'YYYY-MM-DD').format('YYYY-MM-DD')
  }
}

class Month {
  month;
  year;
  name;

  constructor(month, year){
    this.month = month;
    this.year = year;
    this.name = Moment(`${year} ${month} 01`, 'YYYY MM DD').format('MMMM'); // January
  }
}





export {
  Calender,
  Day,
  Month
}