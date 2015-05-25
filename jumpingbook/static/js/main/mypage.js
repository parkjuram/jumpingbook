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

$( document ).ready(function() {

    $('input.rating').rating();

    $('#my-comment').click( function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: urlForRatedBook,
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
                                            <div class=\"item-title\">" + item['name'] + "</div> \
                                            <div class=\"item-author\">" + item['author'] + "</div> \
                                            <input type=\"hidden\" class=\"rating\" data-fractions=\"2\"/> \
                                        </div> \
                                    </div>";
                    $('.book-item-container').append( elem );
                }
            },
            error: function(xhr, type, exception) {
                alert("ajax error response type1 "+type);
            }
        });
    });

});