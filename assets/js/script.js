$(document).ready(function(){
    $('#filter').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('#products .item').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myModal").modal({
        keyboard: true,
        backdrop: "static",
        show: false,
    }).on("show.bs.modal", function(event){
        let button = $(event.relatedTarget);
        let movieId = button.data("id")-1;
        $.ajax({
            url: "./api/index.php",
            type: "get",
            dataType: "json",
            success: function (data) {
                $("#movieDetails").append('<table><tr><td>' +
                    '<img  style="height:200px; width:100%" src="'+data[movieId].posterurl+'" alt="" />' +
                    '<h4 class="group inner list-group-item-heading">'+data[movieId].title+
                    '</h4>'+
                    '<p class="group inner list-group-item-text">'+data[movieId].genres+'. Year: '+data[movieId].year+'. Content Rating: '+data[movieId].contentRating+'</p>'+
                    +'</td> <td>'+data[movieId].storyline+' </td></tr></table>'
                )
            }
        });
    }).on("hide.bs.modal", function (event) {
        $(this).find("#movieDetails").html("");
    });
});
$(function () {
    $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
    $.ajax({
        url: "./api/index.php",
        type: "get",
        dataType: "json",
        success: function (data) {
            data.forEach(function(movie) {
                var total = 0;
                movie.ratings.forEach(function(item){
                    total =total + item;
                });
                var rating = (total/movie.ratings.length)/2;
                var starStr = Array(Math.round(rating)).fill(null).reduce((a) => a + '<i class="fa fa-star" aria-hidden="true" style="color: #D91E18;"></i>', '');
                $("#products").append('<div class="item col-xs-12 col-sm-6 col-md-4 col-lg-4"> <div class="thumbnail">' +
                    '<img class="group list-group-image" style="height:400px; width:100% !important;" src="'+movie.posterurl+'" alt="" />' +
                    '<div class="caption" style="margin-top: 5px;"> <h4 class="group inner list-group-item-heading">'+movie.title+ '&nbsp;<small>Rating :<span>' + starStr + '</span></small>'+
                    '</h4>'+
                    '<p class="group inner list-group-item-text">'+movie.genres+' <button type="button" data-id="'+movie.id+'" class="btn btn-view" data-toggle="modal" data-target="#myModal">View</button></p></div>'+

                    '</div>' +
                    '</div>'
                    +'</div>'
                )
            })
        }
    });
});