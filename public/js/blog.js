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
      // var button = $(socity).children("#heading" + index).children("button")
      var input = $(collapse).children("div").children('label').children("li").children("input[name='all']")
      // $(socity).children("#heading" + index).children("button").children("input")
      var subinputs = $(collapse).children('div').children('label').children('li').children('input')

      input.on("change",function(event){
        
        if ($(this).prop("checked")) {
          subinputs.each(function(index,value){
            $(this).prop("checked",true)
          })
        } else {
          subinputs.each(function(index,value){
            $(this).prop("checked",false)
          })
        }
        submmitbutton()
      })

      subinputs.each(function(index,item){
        if (index == 0){


        } else {
          $(item).on("change",function(event){
            submmitbutton()
          })
       }
      })

    });

};
var submmitbutton = function(){
  var socities = $("#filter div.card");
  var submitbtn = $("#filterform").children('button')
  var nothingSelected =true;
  socities.each(function(index, socity) {
    var subinputs = $(socity).children("#collapse" + index).children('div').children('label').children('li').children('input')
    subinputs.each(function(index,item){

      if($(item).prop('checked')){
        submitbtn.css('display', "block").addClass('animated fadeIn')
        nothingSelected = false
        // return false;
      }

    })
    
  })
  if (nothingSelected){
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
