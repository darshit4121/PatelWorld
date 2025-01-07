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
$(window).on("load", function () {

    var PageOwner = 1;
    var PageSizeOwner = 4;
    var DataCountOwner = PageSizeOwner;
    if (parseInt($("#TotalPremises").val()) < DataCountOwner)
        DataCountOwner = $("#TotalPremises").val();

    //Get the context of the Chart canvas element we want to select
    var ctx = $("#column-chart-owner");

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
                ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    // OR //
                    beginAtZero: true   // minimum value will be 0.
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

    var lineChart;

    function GetBarChartOwnerData() {
        if (ctx.length > 0) {
            $.ajax({
                type: "GET",
                url: "/Home/GetBarChartData?Page=" + PageOwner + "&PageSize=" + PageSizeOwner,
                success: function (data) {
                    data = JSON.parse(data);

                    var PremisesNames = [];
                    var TodayCounts = [];
                    var WeeklyCounts = [];
                    var MonthlyCounts = [];

                    for (var x in data) {
                        PremisesNames.push(data[x].PremisesName);
                        TodayCounts.push(data[x].TodayVisitorz);
                        WeeklyCounts.push(data[x].WeeklyVisitorz);
                        MonthlyCounts.push(data[x].MonthlyVisitorz);
                    }

                    // Chart Data
                    var chartData = {
                        labels: PremisesNames,
                        datasets: [{
                            label: "Today Visitorz",
                            data: TodayCounts,
                            minBarLength: 0,
                            backgroundColor: "#28D094",
                            hoverBackgroundColor: "rgb(40 208 148 / 0.9)",
                            borderColor: "transparent"
                        },
                        {
                            label: "Weekly Visitorz",
                            data: WeeklyCounts,
                            minBarLength: 0,
                            backgroundColor: "#FF9149",
                            hoverBackgroundColor: "rgb(255 145 73 / 0.9)",
                            borderColor: "transparent"
                        }, {
                            label: "Monthly Visitorz",
                            data: MonthlyCounts,
                            minBarLength: 0,
                            backgroundColor: "#1E9FF2",
                            hoverBackgroundColor: "rgb(30 159 242 / 0.9)",
                            borderColor: "transparent"
                        }]
                    };

                    var config = {
                        type: 'bar',

                        // Chart Options
                        options: chartOptions,

                        data: chartData,

                        scaleOverride: true,
                        scaleSteps: 10,
                        scaleStepWidth: 50,
                        scaleStartValue: 0,
                    };

                    // Create the chart
                    lineChart = new Chart(ctx, config);

                    DisableButtons();
                },
                error: function (error) {
                    alert("Something Went Wrong, Try again later.");
                    console.log('Error in bar chart column.js | GetBarChartOwnerData function');
                    console.log(error);
                }
            });
        }
    }
    GetBarChartOwnerData();

    function DisableButtons() {
        var TotalPremisesOwner = parseInt($("#TotalPremises").val());
        if (PageOwner == 1) {
            $("#btnPreOwner").prop('disabled', true).addClass('btn-outline-primary').removeClass('btn-primary');
        } else {
            $("#btnPreOwner").prop('disabled', false).addClass('btn-primary').removeClass('btn-outline-primary');
        }

        if (DataCountOwner >= TotalPremisesOwner) {
            $("#btnNextOwner").prop('disabled', true).addClass('btn-outline-primary').removeClass('btn-primary');
        } else {
            $("#btnNextOwner").prop('disabled', false).addClass('btn-primary').removeClass('btn-outline-primary');
        }
    }

    $("#btnNextOwner").on('click', function () {
        PageOwner = PageOwner + 1;
        DataCountOwner = DataCountOwner + PageSizeOwner;
        lineChart.destroy();
        GetBarChartOwnerData();
    });

    $("#btnPreOwner").on('click', function () {
        PageOwner = PageOwner - 1;
        DataCountOwner = DataCountOwner - PageSizeOwner;
        lineChart.destroy();
        GetBarChartOwnerData();
    });

});