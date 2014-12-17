var Util = {
  formatDate: function(date) {
    return moment(date).format('YYYY-MM-DD');
  },
  formatDateTime: function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm');
  }
};
