/*=========================================================================================
    File Name: pie.js
    Description: Chartjs pie chart
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Pie chart
// ------------------------------
$(window).on("load", function () {

    //Get the context of the Chart canvas element we want to select
    var ctxOwner = $("#simple-pie-chart-owner");

    // Chart Options
    var chartOptionsOwner = {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        legend: {
            position: 'bottom',
        },
    };

    function GetPieChartOwnerData() {
        if (ctxOwner.length > 0) {
            $.ajax({
                type: "GET",
                url: "/Home/GetPieChartData",
                success: function (data) {
                    data = JSON.parse(data);
                    if (data == null || data == "") {
                        ctxOwner[0].style.display = 'none';
                        nodata = $('#simple-pie-chart-noData')[0];
                        nodata.style.display = 'block';
                        nodata.innerHTML = "There are no visitorz created yet";
                        return false;
                    }
                    var MonthNames = [];
                    var Counts = [];
                    for (var x in data) {
                        MonthNames.push(data[x].MonthName);
                        Counts.push(data[x].Count);
                    }

                    //$.each(ShippedOrderItem, function (key, value) {
                    //    TotalQty = TotalQty + parseInt(value.Quantity);
                    //});

                    // Chart Data
                    var chartData = {
                        labels: MonthNames,
                        datasets: [{
                            //label: "My First dataset",
                            data: Counts,
                            backgroundColor: ['#00A5A8', '#626E82', '#FF7D4D', '#FF4558', '#28D094', '#B22222', '#FFD700', '#BDB76B', '#BC8F8F', '#20B2AA', '#4682B4', '#DA70D6'],
                        }]
                    };

                    var config = {
                        type: 'pie',

                        // Chart Options
                        options: chartOptionsOwner,

                        data: chartData
                    };

                    // Create the chart
                    var pieSimpleChart = new Chart(ctxOwner, config);

                },
                error: function (error) {
                    //alert("errror");
                    console.log(error);
                }
            });
        }
    }
    GetPieChartOwnerData();


});