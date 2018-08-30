var animate = function() {
  if ($(".animation-container").length > 0) {
    $(".animation-container .to-animate").each(function(k) {
      var el = $(this);

      setTimeout(
        function() {
          el.addClass("fadeIn animated");
        },
        k * 40,
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

$(function() {
  aboutWayPoint();
  // filterAnimation();
});
