export class DateService {
  private static readonly date: Date = new Date();
  static readonly day: string = DateService.date.getDate().toString();
  static readonly month: string = (DateService.date.getMonth() + 1).toString();
  static readonly year: string = DateService.date.getFullYear().toString();

  public static getMonthEnd(month: string): string {
    const m = parseInt(month, 10);
    switch (m) {
      case 1:
        return '31';
      case 2:
        return '28';
      case 3:
        return '31';
      case 4:
        return '30';
      case 5:
        return '31';
      case 6:
        return '30';
      case 7:
        return '31';
      case 8:
        return '31';
      case 9:
        return '30';
      case 10:
        return '31';
      case 11:
        return '30';
      case 12:
        return '31';
      default:
        return '';
    }
  }

  public static convertMonthNameToNumber(month: string): string {
    switch (month) {
      case 'Jan':
        return '1';
      case 'Feb':
        return '2';
      case 'Mar':
        return '3';
      case 'Apr':
        return '4';
      case 'May':
        return '5';
      case 'Jun':
        return '6';
      case 'Jul':
        return '7';
      case 'Aug':
        return '8';
      case 'Sep':
        return '9';
      case 'Oct':
        return '10';
      case 'Nov':
        return '11';
      case 'Dec':
        return '12';
      default:
        return '';
    }
  }
}
