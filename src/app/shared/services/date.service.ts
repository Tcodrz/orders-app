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
}
