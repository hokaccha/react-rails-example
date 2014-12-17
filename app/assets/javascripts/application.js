//= require common
//= require jquery
//= require react
//= require react_ujs
//= require_tree ./components

$(function() {
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader(
        'X-CSRF-Token',
        $('meta[name="csrf-token"]').attr('content')
      );
    }
  });
});
