import moment from 'moment';

export default class Util {
  static formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  static formatDateTime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm');
  }
}
