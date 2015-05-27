function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
});

var $loading = $('#loadingDiv').hide();

$( document ).ready(function() {
  $("#loadingDiv").bind("ajaxSend", function() {
      $(this).show();
    }).bind("ajaxStop", function() {
      $(this).hide();
    }).bind("ajaxError", function() {
      $(this).hide();
    });


  $.ajax({
    type: 'POST',
    url: urlForBookList,
    data: {},
    success: function(data){
      $('input.rating').off();
      for(var index in data) {
        var item = data[index];
        var elem = "    <div class=\"book-item\" item-id=\"" + item['id'] + "\"> \
        <div class=\"img-container\"> \
        <img src=\"http://youth.sangju.go.kr/fileUpload/contentsboard/book_00406.jpg\" /> \
        </div> \
        <div class=\"star-rating-container\"> \
          <div id = \"loadingDiv\"><i class=\"fa fa-circle-o-notch fa-spin fa-2x\"></i></div> \
          <div class=\"item-title\">" + item['name'] + "</div> \
          <div class=\"item-author\">" + item['author'] + "</div> \
          <input type=\"hidden\" class=\"rating\" data-fractions=\"2\"/> \
        </div> \
        </div>";
        $('.book-item-container').append( elem );
      }
      $('input.rating').rating();
      $('input.rating').on('change', function () {
        var current_item = $(this).parent().parent();
        $.ajax({
          type: 'POST',
          url: urlForBookRating,
          data: {
            "item-id": $(this).parent().parent().attr('item-id'),
            "rating" : $(this).val()
          },
          success:function()
          {
            current_item.remove();
          },
          error: function(xhr, type, exception) {
            alert("ajax error response type2 "+type);
          }
        })
      })
    },
    error: function(xhr, type, exception) {
      alert("ajax error response type1 "+type);
    }
  });

});
