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

    var Page = 1;
    var PageSize = 4;
    var DataCount = PageSize;
    if (parseInt($("#TotalPremises").val()) < DataCount)
        DataCount = $("#TotalPremises").val();

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
        responsiveAnimationDuration: 500,
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

    function GetBarChartData() {
        if (ctx.length > 0) {
            $.ajax({
                type: "GET",
                url: "/admin/Home/GetBarChartData?Page=" + Page + "&PageSize=" + PageSize + "&OwnerId=" + $("#OwnerId").val(),
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
                    console.log('Error in bar chart column.js | GetBarChartData function');
                    console.log(error);
                }
            });
        }
    }
    GetBarChartData();

    function DisableButtons() {
        var TotalPremises = parseInt($("#TotalPremises").val());
        if (Page == 1) {
            $("#btnPre").prop('disabled', true).addClass('btn-outline-primary').removeClass('btn-primary');
        } else {
            $("#btnPre").prop('disabled', false).addClass('btn-primary').removeClass('btn-outline-primary');
        }

        if (DataCount >= TotalPremises) {
            $("#btnNext").prop('disabled', true).addClass('btn-outline-primary').removeClass('btn-primary');
        } else {
            $("#btnNext").prop('disabled', false).addClass('btn-primary').removeClass('btn-outline-primary');
        }
    }

    $("#btnNext").on('click', function () {
        Page = Page + 1;
        DataCount = DataCount + PageSize;
        lineChart.destroy();
        GetBarChartData();
    });

    $("#btnPre").on('click', function () {
        Page = Page - 1;
        DataCount = DataCount - PageSize;
        lineChart.destroy();
        GetBarChartData();
    });

    $("#btnFilter").on('click', function () {
        $.ajax({
            type: "GET",
            url: "/admin/Home/GetDataCount?OwnerId=" + $("#OwnerId").val(),
            success: function (data) {
                data = parseInt(data);
                Page = 1;
                DataCount = PageSize;
                $("#TotalPremises").val(data);
                if (data < DataCount)
                    DataCount = $("#TotalPremises").val();

                lineChart.destroy();
                GetBarChartData();
            },
            error: function (error) {
                alert("Something Went Wrong, Try again later.");
                console.log('Error in bar chart column.js | GetBarChartData function');
                console.log(error);
            }
        });
    });

    var PremisesPage = 1;
    var PremisesPageSize = 4;
    var OwnerDataCount = PremisesPageSize;
    if (parseInt($("#TotalOwners").val()) < OwnerDataCount)
        OwnerDataCount = $("#TotalOwners").val();

    //Get the context of the Chart canvas element we want to select
    var ctx2 = $("#premises-column-chart");

    // Chart Options
    var chartOptions2 = {
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
        responsiveAnimationDuration: 500,
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

    var lineChart2;

    function GetBarChartPremisesData() {
        $.ajax({
            type: "GET",
            url: "/Home/GetBarChartPremisesData?Page=" + PremisesPage + "&PageSize=" + PremisesPageSize,
            success: function (data) {
                data = JSON.parse(data);

                var OwnerNames = [];
                var TodayCounts = [];
                var WeeklyCounts = [];
                var MonthlyCounts = [];

                for (var x in data) {
                    OwnerNames.push(data[x].OwnerName);
                    TodayCounts.push(data[x].TodayPremises);
                    WeeklyCounts.push(data[x].WeeklyPremises);
                    MonthlyCounts.push(data[x].MonthlyPremises);
                }

                // Chart Data
                var chartData = {
                    labels: OwnerNames,
                    datasets: [{
                        label: "Today Premises",
                        data: TodayCounts,
                        minBarLength: 0,
                        backgroundColor: "#28D094",
                        hoverBackgroundColor: "rgb(40 208 148 / 0.9)",
                        borderColor: "transparent"
                    },
                    {
                        label: "Weekly Premises",
                        data: WeeklyCounts,
                        minBarLength: 0,
                        backgroundColor: "#FF9149",
                        hoverBackgroundColor: "rgb(255 145 73 / 0.9)",
                        borderColor: "transparent"
                    }, {
                        label: "Monthly Premises",
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
                    options: chartOptions2,

                    data: chartData,

                    scaleOverride: true,
                    scaleSteps: 10,
                    scaleStepWidth: 50,
                    scaleStartValue: 0,
                };

                // Create the chart
                lineChart2 = new Chart(ctx2, config);

                DisableButtons2();
            },
            error: function (error) {
                alert("Something Went Wrong, Try again later.");
                console.log('Error in bar chart column.js | GetBarChartPremisesData function');
                console.log(error);
            }
        });
    }
    //GetBarChartPremisesData();

    function DisableButtons2() {
        var TotalPremises = parseInt($("#TotalOwners").val());
        if (PremisesPage == 1) {
            $("#btnPremisesPre").prop('disabled', true).addClass('btn-outline-primary').removeClass('btn-primary');
        } else {
            $("#btnPremisesPre").prop('disabled', false).addClass('btn-primary').removeClass('btn-outline-primary');
        }

        if (OwnerDataCount >= TotalPremises) {
            $("#btnPremisesNext").prop('disabled', true).addClass('btn-outline-primary').removeClass('btn-primary');
        } else {
            $("#btnPremisesNext").prop('disabled', false).addClass('btn-primary').removeClass('btn-outline-primary');
        }
    }

    $("#btnPremisesNext").on('click', function () {
        PremisesPage = PremisesPage + 1;
        OwnerDataCount = OwnerDataCount + PremisesPageSize;
        lineChart2.destroy();
        GetBarChartPremisesData();
    });

    $("#btnPremisesPre").on('click', function () {
        PremisesPage = PremisesPage - 1;
        OwnerDataCount = OwnerDataCount - PremisesPageSize;
        lineChart2.destroy();
        GetBarChartPremisesData();
    });

});