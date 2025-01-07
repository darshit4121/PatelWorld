/*
--------------------------------------------------------------------------------------------------------
* Template Name             :                                                                          *
* Author                    :                                                                          *
* Version                   : 1.0                                                                      *
* Design and Developed by   :                                                                          * 
*-------------------------------------------------------------------------------------------------------
NOTE: This is main stylesheet of template, This file contains the styling for the actual Template.*/ 


(function(window, undefined) {
  'use strict';
    var PUS = {};  
    /*
    NOTE:
    ------
    PLACE HERE YOUR OWN JAVASCRIPT CODE IF NEEDED
    WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR JAVASCRIPT CODE PLEASE CONSIDER WRITING YOUR SCRIPT HERE.  */
 

     // :: Copyright Year  

    $(".ul_menu li").on("click", function () {
        $(".ul_menu li").removeClass("ul_menu_active");
        $(this).addClass("ul_menu_active");
    });

    $(document).mouseup(function (e) {
        var container = $(".ul_menu li");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".ul_menu li").removeClass("ul_menu_active");
        }
    });


    var currentYear = (new Date).getFullYear();
    $("#copyright-year").text((new Date).getFullYear()); 

    $(".filter-panel").click(function(){
        $(".right-panel-filter").removeClass("filter-active"); 
    });

    $(".filter-click").click(function(){
        $(".right-panel-filter").addClass("filter-active"); 
    });

    $(".panel-overlay").click(function(){
        $(".right-panel-filter").removeClass("filter-active"); 
    }); 
    $(".mob-sidebar a").click(function () {
        $(".settings-left-sidebar").toggle();
    });

    $(document).mouseup(function (e) {
        if (window.innerWidth < 991) {
            var container = $(".mob-sidebar");
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".settings-left-sidebar").hide();
            }
        }
        
    });

    $(document).scroll(function (e) {
        if (window.innerWidth < 991) {
            $(".settings-left-sidebar").hide();
        }
    });

    /*==========================================
            :: carousel
    ==========================================*/          
    PUS.carousel = function () {
        var owlslider = jQuery(".totalrecords");
        if (owlslider.length > 0) {
            owlslider.each(function () {
                var $this = $(this),
                    $items = ($this.data('items')) ? $this.data('items') : 1,
                    $loop = ($this.attr('data-loop')) ? $this.data('loop') : false,
                    $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
                    $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : true,
                    $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : false,
                    $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 5000,
                    $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 1000,
                    $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
                    $space = ($this.attr('data-space')) ? $this.data('space') : 30,
                    $animateOut = ($this.attr('data-animateOut')) ? $this.data('animateOut') : false;

                $(this).owlCarousel({
                    loop: $loop,
                    items: $items,
                    responsive: {
                        0: {
                            items: $this.data('xx-items') ? $this.data('xx-items') : 1
                        },
                        480: {
                            items: $this.data('xs-items') ? $this.data('xs-items') : 1
                        },
                        768: {
                            items: $this.data('sm-items') ? $this.data('sm-items') : 2
                        },
                        980: {
                            items: $this.data('md-items') ? $this.data('md-items') : 3
                        },
                        1200: {
                            items: $items
                        }
                    },
                    dots: $navdots,
                    space: $space,
                    autoplayTimeout: $autospeed,
                    smartSpeed: $smartspeed,
                    autoHeight: $autohgt,
                    margin: $space,
                    nav: $navarrow,
                    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                    autoplay: $autoplay,
                    autoplayHoverPause: true
                });
            });
        }
    }

    PUS.PanelFlag = function () {
        $(".flags-panel").click(function () {
            $(".right-panel-flags").removeClass("flags-active");
        });
        $(".toolbar-filter").click(function () {
            $(".right-panel-flags").addClass("flags-active");
        });
        $(".panel-overlay").click(function () {
            $(".right-panel-flags").removeClass("flags-active");
        });
    };



    /*==========================================
            :: Document Ready
    ==========================================*/
    $(document).ready(function () {
        PUS.carousel(), //carousel 
            PUS.PanelFlag()
    });
    
})(window);

 
 
 

 