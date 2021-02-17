//FUNCTION: AOS lib scroll animate duration
AOS.init({
  duration: 500
});

//FUNCTION: splash screen
const splash = document.querySelector(".splash");

document.addEventListener("DOMContentLoaded", e => {
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 3000);
});

//FUNCTION: hide header in splash screen & show when splash is over
const header = document.querySelector(".header");

document.addEventListener("DOMContentLoaded", e => {
  setTimeout(() => {
    header.classList.add("display-show");
  }, 3000);
});

//FUNCTION: header change opacity on scroll
$(function() {
  $(window).on("scroll", function() {
    if ($(window).scrollTop() > 950) {
      $(".header").addClass("active");
    } else {
      //remove the background property so it comes transparent again
      $(".header").removeClass("active");
    }
  });
});

/*
//FUNCTION: scroll to top on click genie logo
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
*/

//FUNCTION: scroll function (link the top tabs)
$(document).ready(function() {
  //add smooth scrolling to all links
  $("a").on("click", function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      //number (300) is the num of milliseconds it takes to scroll to the div
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        300,
        function() {
          window.location.hash = hash;
        }
      );
    } //end if
  });
});

//FUNCTION: fade in animation function
$(window).on("load", function() {
  $(window)
    .scroll(function() {
      var windowBottom = $(this).scrollTop() + $(this).innerHeight();
      $(".fade").each(function() {
        var objectBottom = $(this).offset().top + $(this).outerHeight();

        //if element in window, load
        if (objectBottom < windowBottom) {
          //object comes into view (scrolling down)
          if ($(this).css("opacity") == 0) {
            $(this).fadeTo(200, 1);
          }
        } else {
          //object goes out of view (scrolling up)
          if ($(this).css("opacity") == 1) {
            $(this).fadeTo(200, 0);
          }
        }
      });
    })
    .scroll(); //scroll-handler on load
});

//FUNCTION: animate numbers
(function($) {
    'use strict';
    $.fn.rCounter = function(options) {
        var settings = $.extend({
            duration: 20,
            easing: 'swing',
        }, options);
        return this.each(function() {
            var $this = $(this);

            var startCounter = function() {
                    var numbers = [];
                    var length = $this.length;
                    var number = $this.text();
                    var isComma = /[,\-]/.test(number);
                    var isFloat = /[,\-]/.test(number);
                    var number = number.replace(/,/g, '');
                    var divisions = settings.duration;
                    var decimalPlaces = isFloat ? (number.split('.')[1] || []).length : 0;

                    //make number string to array to display
                    for (var rcn = divisions; rcn >= 1; rcn--) {

                        var newNum = parseInt(number / divisions * rcn);
                        if (isFloat) {
                            newNum = parseFloat(number / divisions * rcn).toFixed(decimalPlaces);
                        }
						if (isComma) {
                            while (/(\d+)(\d{3})/.test(newNum.toString())) {
                                newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                            }
                        }
                        numbers.unshift(newNum);
                    }
                    var counterUpDisplay = function() {
                        $this.text(numbers.shift());
                        setTimeout(counterUpDisplay, settings.duration);
                    };
                    setTimeout(counterUpDisplay, settings.duration);
                } 

            //waypoint bind
            $this.waypoint(startCounter, { offset: '100%', triggerOnce: true });
        });


    }

}(jQuery));

//FUNCTION: animate numbers whe scrolled to
(function($) {
    'use strict';
    $('.count-num').rCounter();
})(jQuery);

//FUNCTION: typewriter effect
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #7C7C7C}";
        document.body.appendChild(css);
    };

/*
//FUNCTION: left --> right parallax
$(window).on('scroll',function(){
		var geniePosition = Math.round($(window).scrollTop() / $(window).height() * 80);
    $('.genieMember').css('transform','translateX('+(geniePosition-40)+'%)');
    
});
*/

//FUNCTION: SCALABLE
var $el = $("#very-specific-design");
var elHeight = $el.outerHeight();
var elWidth = $el.outerWidth();

var $wrapper = $("#scaleable-wrapper");

$wrapper.resizable({
  resize: doResize
});

function doResize(event, ui) {
  
  var scale, origin;
    
  scale = Math.min(
    ui.size.width / elWidth,    
    ui.size.height / elHeight
  );
  
  $el.css({
    transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
  });
  
}

var starterData = { 
  size: {
    width: $wrapper.width(),
    height: $wrapper.height()
  }
}
doResize(null, starterData);
