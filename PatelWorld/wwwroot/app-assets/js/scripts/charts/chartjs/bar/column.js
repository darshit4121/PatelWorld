/*=========================================================================================
    File Name: column.js
    Description: Chartjs column chart
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Column chart
// ------------------------------
$(window).on("load", function(){

    //Get the context of the Chart canvas element we want to select
    var ctx = $("#column-chart");

    // Chart Options
    var chartOptions = {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each bar to be 2px wide and green
        elements: {
            rectangle: {
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:500,
        legend: {
            position: 'top',
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }]
        },
        title: {
            display: true,
            //text: 'Chart.js Bar Chart'
        }
    };

    // Chart Data
    var chartData = {
        labels: ["January", "February", "March", "April"],
        datasets: [{
            label: "Today Visitorz",
            data: [30, 59, 80, 81],
            backgroundColor: "#28D094",
            hoverBackgroundColor: "rgb(40 208 148 / 0.9)",
            borderColor: "transparent"
        }, 
        {
            label: "Weekly Visitorz",
            data: [40, 48, 40, 19],
            backgroundColor: "#FF9149",
            hoverBackgroundColor: "rgb(255 145 73 / 0.9)",
            borderColor: "transparent"
        },{
            label: "Monthly Visitorz",
            data: [30, 30, 20, 40],
            backgroundColor: "#1E9FF2",
            hoverBackgroundColor: "rgb(30 159 242 / 0.9)",
            borderColor: "transparent"
        }]
    };

    var config = {
        type: 'bar',

        // Chart Options
        options : chartOptions,

        data : chartData
    };

    // Create the chart
    var lineChart = new Chart(ctx, config);
});