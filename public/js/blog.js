var animate = function() {
  if ($(".animation-container").length > 0) {
    $(".animation-container .to-animate").each(function(k) {
      var el = $(this);

      setTimeout(
        function() {
          el.addClass("fadeIn animated");
        },
        k * 80,
        "easeInOutExpo"
      );
    });
  }
};
var aboutWayPoint = function() {
  if ($(".animation-container").length > 0) {
    $(".animation-container").waypoint(
      function(direction) {
        if (direction === "down" && !$(this).hasClass("animated")) {
          setTimeout(animate, 100);

          $(this.element).addClass("animated");
        }
      },
      { offset: "95%" }
    );
  }
};

var filteritem = function() {
  var socities = $("#filter div.card");
  var submitbtn = $("#filterform").children('button')

    // +++++++++++++++++++++++++++++
    socities.each(function(index, socity) {
      var heading = $(socity).children("#heading" + index)
      var collapse = $(socity).children("#collapse" + index)
      var button = $(socity).children("#heading" + index).children("button")
      var input =$(socity).children("#heading" + index).children("button").children("input")
      var subinputs = $(collapse).children('div').children('li').children('input')


      input.on('click', function(event) {
        // event.preventDefault();
        /* Act on the event */
        event.stopPropagation()
        $(this).prop('checked',$(input).prop('checked')) // change checkboxstate
        if($(input).prop('checked')){ // expand accordin card + mark sub element
            collapse.collapse("show")
            subinputs.each(function(index, el) {
              $(el).prop("checked",true)
            });
        } else { // shrink accordin card + un-mark sub element
          collapse.collapse("hide")
          subinputs.each(function(index, el) {
            $(el).prop("checked",false)
          });
        }

        submmitbutton()
      });

    });

};
var submmitbutton = function(){
  var socities = $("#filter div.card");
  var submitbtn = $("#filterform").children('button')
  var s =true;
  socities.each(function(index, socity) {
    var checkbox =$(socity).children("#heading" + index).children("button").children("input")
    if(checkbox.prop('checked')){
      submitbtn.css('display', "block").addClass('animated fadeIn')
      s= false
      return false;
    }
  })
  if (s){
    submitbtn.css('opacity', '0');
    setTimeout(function(){
      submitbtn.css('display', 'none');
    },200)
  }

}

// var filterlink = function(){
//   $(".filterLink").each(function(index,element){
//     var query = $(element).html()
//
//     $(this).on('click', function(event) {
//       event.preventDefault();
//       /* Act on the event */
//       // $.$.post('/blog/filter', param1: query, function(data, textStatus, xhr) {
//       //   /*optional stuff to do after success */
//       //   console.log(data);
//       // });
//     });
//   })
// }

$(function() {
  aboutWayPoint();
  filteritem();
  // filterlink()
  // filterAnimation();
});
