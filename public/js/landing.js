$(".carousel").carousel({
  interval: 2500,
  keyboard: false,
  pause: false
});
// $('body').scrollspy({ target: '#navbar' })


// ========================= navbar scroll effect ======================
$(window).scroll(function() {
  let navbar = $("#navbar"),
    scrollTop = $(this).scrollTop();
  if (scrollTop < 400) {
    navbar.waypoint(function(direction){
      if(direction === "up" ){
        navbar.removeClass(' animated fadeInDown')
        navbar.addClass('animated fadeOut')

        setTimeout(function(){
          navbar.removeClass('nav-body fadeOut')
          navbar.addClass('nav-head fadeIn ')
        },200)

      }
    })
    // navbar.removeClass('nav-body animated fadeInDown')
    // navbar.addClass('nav-head animated fadeInUp')

  } else if (scrollTop > 400) {
      navbar.removeClass('nav-head animated fadeInUp')
      navbar.addClass('nav-body  animated fadeInDown')
  }
});

var aboutAnimate = function() {
  if ($("#about-us").length > 0) {
    $("#about-us .to-animate").each(function(k) {
      var el = $(this);

      setTimeout(
        function() {
          el.addClass("fadeInUp animated");
        },
        k * 200,
        "easeInOutExpo"
      );
    });
  }
};
var aboutWayPoint = function() {
  if ($("#about-us").length > 0) {
    $("#about-us").waypoint(
      function(direction) {
        if (direction === "down" && !$(this).hasClass("animated")) {
          setTimeout(aboutAnimate, 200);

          $(this.element).addClass("animated");
        }
      },
      { offset: "95%" }
    );
  }
};
var teamAnimate = function() {
  if ($("#team").length > 0) {
    $("#team .to-animate").each(function(k) {
      var el = $(this);

      setTimeout(
        function() {
          el.addClass("fadeInUp animated");
          el.removeClass("to-animate");
        },
        k * 200,
        "easeInOutExpo"
      );
    });
  }
};
var teamWayPoint = function() {
  if ($("#team").length > 0) {
    $("#team").waypoint(
      function(direction) {
        if (direction === "down" && !$(this).hasClass("animated")) {
          setTimeout(teamAnimate, 200);

          $(this.element).addClass("animated");
        }
      },
      { offset: "95%" }
    );
  }
};
var servicesAnimate = function() {
  if ($("#socities").length > 0) {
    $("#socities .to-animate").each(function(k) {
      var el = $(this);

      setTimeout(
        function() {
          el.addClass("fadeInUp animated");
        },
        k * 200,
        "easeInOutExpo"
      );
    });
  }
};
var servicesWayPoint = function() {
  if ($("#socities").length > 0) {
    $("#socities").waypoint(
      function(direction) {
        if (direction === "down" && !$(this).hasClass("animated")) {
          setTimeout(servicesAnimate, 200);

          $(this.element).addClass("animated");
        }
      },
      { offset: "95%" }
    );
  }
};

var smoothScroll = function() {
  $(".nav-item a").each(function(index, el) {
    if (this.hash !== "") {
      $(this).click(function(event) {
        event.preventDefault();
        var hash = this.hash;
        $("html,body").animate(
          {
            scrollTop: $(hash).offset().top
          },
          800
        );
      });
    }
  });
};

$(function() {
  smoothScroll();
  aboutWayPoint();
  teamWayPoint();
  servicesWayPoint();
  // featuresWayPoint();
  // testimonialsWayPoint();
  // pricingWayPoint();
  // pressWayPoint();
});
