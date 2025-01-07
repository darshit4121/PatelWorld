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
$(window).on("load", function(){

    var ctx = $("#simple-pie-chart");

    // Chart Options
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        legend: {
            //display: false,
            position: 'bottom',
        },
    };

    //function GetPieChartData() {
    //    if (ctx.length > 0) {
    //        $.ajax({
    //            type: "GET",
    //            url: "/Home/GetBarChartPremisesData?Page=0&PageSize=0",
    //            success: function (data) {
    //                
    //                data = JSON.parse(data);
    //                if (data == null || data == "") {
    //                    ctx[0].style.display = 'none';
    //                    nodata = $('#simple-pie-chart-noData')[0];
    //                    nodata.style.display = 'block';
    //                    nodata.innerHTML = "No Premises Created This Month";
    //                    return false;
    //                }

    //                var OwnerNames = [];
    //                var Counts = [];
    //                for (var x in data) {
    //                    OwnerNames.push(data[x].OwnerName);
    //                    Counts.push(data[x].MonthlyPremises);
    //                }


    //                //$.each(ShippedOrderItem, function (key, value) {
    //                //    TotalQty = TotalQty + parseInt(value.Quantity);
    //                //});

    //                // Chart Data
    //                var chartData = {
    //                    //labels: ["January", "February", "March", "April", "May","June","July","August","September","October","November","December"],
    //                    datasets: [{
    //                        //label: OwnerNames,
    //                        data: Counts,
    //                        backgroundColor: ['#00A5A8', '#626E82', '#FF7D4D', '#FF4558', '#28D094', '#B22222', '#FFD700', '#BDB76B', '#BC8F8F', '#20B2AA', '#4682B4', '#DA70D6'],
    //                    }]
    //                };

    //                var config = {
    //                    type: 'pie',

    //                    // Chart Options
    //                    options: chartOptions,

    //                    data: chartData
    //                };

    //                // Create the chart
    //                var pieSimpleChart = new Chart(ctx, config);

    //            },
    //            error: function (error) {
    //                //alert("errror");
    //                console.log(error);
    //            }
    //        });
    //    }
    //}
    function GetPieChartData() {
        if (ctx.length > 0) {
            $.ajax({
                type: "GET",
                url: "/admin/Home/GetPieChartPremisesData",
                success: function (data) {
                  
                    data = JSON.parse(data);
                    if (data == null || data == "") {
                        ctx[0].style.display = 'none';
                        nodata = $('#simple-pie-chart-noData')[0];
                        nodata.style.display = 'block';
                        nodata.innerHTML = "There are no premises created yet";
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
                        options: chartOptions,

                        data: chartData
                    };

                    // Create the chart
                    var pieSimpleChart = new Chart(ctx, config);

                },
                error: function (error) {
                    //alert("errror");
                    console.log(error);
                }
            });
        }
    }
    GetPieChartData();
});