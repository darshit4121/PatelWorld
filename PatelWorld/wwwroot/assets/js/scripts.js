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

    $("[data-toggle=tooltip").tooltip();

    $('.select-select2').select2({});


    $(".ul_menu li").on("click", function() {
        $(".ul_menu li").removeClass("ul_menu_active");
        $(this).addClass("ul_menu_active");
    });

    $(document).mouseup(function(e) {
        var container = $(".ul_menu li");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".ul_menu li").removeClass("ul_menu_active");
        }
    });

    // :: Copyright Year   
    var currentYear = (new Date).getFullYear();
    $("#copyright-year").text((new Date).getFullYear());

    $(".filter-panel").click(function() {
        $(".right-panel-filter").removeClass("filter-active");
    });

    $(".filter-click").click(function() {
        $(".right-panel-filter").addClass("filter-active");
    });

    $(".panel-overlay").click(function() {
        $(".right-panel-filter").removeClass("filter-active");
    });


    $('.daterange-right').daterangepicker({
        opens: 'left'
    });

    $('.single-datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '02/20/2018',
    });

    $('.single-timepicker').timepicker('setTime', '12:45 AM');


    // $(".access-more").click(function(){
    //     $(".Department-actions").toggle(); 
    // }); 

    $(".alert-email-add a").click(function() {
        $(".added-Employee-box").toggle();
    });

    $(".mob-sidebar a").click(function() {
        $(".settings-left-sidebar").toggle();
    });





    /*==========================================
            :: carousel
    ==========================================*/
    PUS.carousel = function() {
        var owlslider = jQuery(".totalrecords");
        if (owlslider.length > 0) {
            owlslider.each(function() {
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


    // new Sortable(FieldsDisplay, {
    //     animation: 150,
    //     ghostClass: 'blue-background-class'
    // });



    /*==========================================
            :: Document Ready
    ==========================================*/
    $(document).ready(function() {
        PUS.carousel() //carousel 
    });

    /*-------------------------------------------------------------
     :: window Ready
     ---------------------------------------------------------------*/
    $(window).ready(function() {
        $('.data-tables').DataTable({
            "scrollX": true
        });
        $('.data-tables-filters').DataTable({
            "scrollX": true,
            "searching": false,
            "paging": false,
            "info": false,
            "ordering": false
        });
    });

    // Url 
    var url = window.location.pathname;
    var activePage = url.substring(url.lastIndexOf('/') + 1);
    $('.ul_menu li .sidebar-tooltip a').each(function() {
        var linkPage = this.href.substring(this.href.lastIndexOf('/') + 1);
        if (activePage == linkPage) {
            $(this).closest(".sidebar-tooltip").parent().addClass("page-active");
        }
    });

    $('.sidebar-submenu .sidebar-menu-item-popover li a').each(function() {
        var linkPage = this.href.substring(this.href.lastIndexOf('/') + 1);
        if (activePage == linkPage) {
            $(this).parent().parent().parent().parent().addClass("page-active");
        }
    });
})(window);