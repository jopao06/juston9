$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip({
    trigger:"hover"
  });
  $('.dropdown-toggle').dropdown()

  // Duplicate Image Panel Template 
  var displayNum = 16;
  var thumbnail;
  for (var i = 0; i < displayNum; i++) {
    thumbnail = $('#thumbnail').clone();
    thumbnail
      .attr("id","thumbnail"+i) // Assign unique id
      .find("img")
      .attr("src","images/"+(i%3)+".jpg")
      .attr("alt","Product "+(i+1))  // Alternate Text (Change to product name)
      .parent().parent()
      .find("a.product-name strong")
      .text("Product "+(i+1))
      .parent().parent()
      .find("p.product-price")
      .text("Php "+((Math.random()*10000).toFixed(2)))
      .parent()
      .find("p.product-seller user")
      .text("User"+(i+1))
      .parent().parent()
      .find("p.product-rating rating")
      .text((Math.random()*100).toFixed(2)+"%");
    $('#thumbnail').parent().append(thumbnail);
    thumbnail.attr("id","thumbnail"+i);
  };

  // Fix height per column
  var thumbHeight= $('.col-thumbnail').css("height");
  $('.col-thumbnail').css("max-height",thumbHeight);

  // Hide Image Panel template
  $('div#thumbnail').css("display","none");

  $('.thumbnail').mouseover(function(){
    $(this).find('.button-group')
      .css("display","block")
      .parent()
      .find(".hidden-caption")
      .css("display","block")
      .parent()
      .parent()
      .css("padding",0);

      // Overlap Image Panel on hover
      $('.thumbnail').css("position","relative");
      $(this).css("z-index",1000);
  });

  $('.thumbnail').mouseout(function(){
    $(this).find('.button-group')
      .css("display","none")
      .parent()
      .css("z-index",0)
      .find(".hidden-caption")
      .css("display","none")

      // Return to default
      $(this).css("z-index",0);
  });

  $('#product-modal').on('show.bs.modal', function (event) {
    var thumbnail = $(event.relatedTarget).parent();
    var modal = $(this);

    modal
      .find("img")
      .attr("src", thumbnail.find("img").attr("src"));


    var img_width =  thumbnail.find('img').width(); 
    var img_height = thumbnail.find('img').height();
    modal.find("img").removeClass("portrait").removeClass("landscape");
    if(img_height > img_width){
      modal.find("img").addClass("portrait");
    }
    else{
      modal.find("img").addClass("landscape");
    }


    modal
      .find(".product-name")
      .text(thumbnail.find(".product-name").text());

    modal
      .find(".product-price")
      .text(thumbnail.find(".product-price").text());

    modal
      .find(".product-seller user")
      .text(thumbnail.find(".product-seller user").text());

    modal
      .find(".product-rating rating")
      .text(thumbnail.find(".product-rating rating").text());
  });

  $('#cart-modal').on('show.bs.modal', function (event) {
    var modal = $(this);

    modal.find('img').each(function(){
      var img_width =  $(this).width(); 
      var img_height = $(this).height();
      // console.log(img_width+" "+img_height);
      modal.find("img").removeClass("portrait").removeClass("landscape");
      if(img_height > img_width){
        $(this).addClass("portrait");
      }
      else{
        $(this).addClass("landscape");
      }

      var desc = modal.find(".product-desc").text();
      var maxLength = 100;
      console.log(desc.length);
      if (desc.length > maxLength) {
          desc = desc.substr(0,maxLength-3) + "...";
      }
      modal.find(".product-desc").text(desc);
    });


  });

  $('.cart-list.close').click(function(){
    var target = $(this).attr("data-dismiss");

    $(target).remove();
  });

  var current_active = $('li.active');
  $('#log-in-modal').on('show.bs.modal', function (event) {
    current_active.removeClass("active");
    $('li.login').addClass("active");
  });
  $('#log-in-modal').on('hide.bs.modal', function (event) {
    $('li.login').removeClass("active");
    current_active.addClass("active");
  });
});