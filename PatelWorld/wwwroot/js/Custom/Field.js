//Visitorz 2.0
//Business Side
$(document).ready(function () {

    //$('.openSetting').on("click", function () {
    //    $('.FilterBox-slide, .overlay-filter').addClass("active");
    //    $(".FilterBox-slide").appendTo("body");
    //});

    //$('#customizerclose-btn').on("click", function () {
    //    $('.FilterBox-slide, .overlay-filter').removeClass("active");
    //});

    LoadField();
    function searchfilter() {
        table.search($('#search').val()).draw();
    }

    $('#Filter').on("click", function () {
        searchfilter();
    });
    $('#reset-layout').on("click", function () {
        $("#search").val("");
        $("#BusinessId").val("");
        $("#PremisesId").val("");
        table.search($('#search').val()).draw();
    });


    $('#Datatype').change(function () {
        var selectedValue = $(this).val();
        if (selectedValue === 'dropdown' || selectedValue === 'checkbox' || selectedValue === 'radiobutton') {
            $('#dropdownContainer').show();
        }
        else {
            $('#dropdownContainer').hide();
        }
    });


    $("#FieldsDisplay").on('click', '.editField', function () {
        var index = $(this).data('id');
        var currentValue = $('#text_' + index).text();
        $('#addFieldoptions').val(currentValue);
        $('#text_' + index).attr('value', currentValue);
        $('#option-id').val(index);
    });

    var deleteIds = [];
    $("#FieldsDisplay").on('click', '.deleteField', function () {
        var index = $(this).data('id');
        var fieldId = $('#Id').val();
        deleteIds.push({ Id: index, FieldId: fieldId });
        $('#div_' + index).remove();
        console.log(deleteIds);
    });


    $("#btnAddFieldPop").on('click', function () { 
        AddSelectedFieldOptions();
    });

    $("#frmField").validate({
        errorElement: 'div',
        errorClass: 'invalid-feedback',
        rules: {
            Name: {
                required: true
            },
            Datatype: {
                required: true
            }
        },
        messages: {
            Name: "Please Enter Field Name",
            Datatype: "Please Select Any Datatype",
        },
        highlight: function (element) {

            if ($(element)[0].localName == 'select') {
                $(element).parent().parent().addClass("input-error");
            }
            else {
                $(element).parent().addClass("input-error");
            }

        },
        unhighlight: function (element) {
            if ($(element)[0].localName == 'select') {
                $(element).parent().parent().removeClass("input-error");
            }
            else {
                $(element).parent().removeClass("input-error");
            }

        },
        submitHandler: function (form) {
            submitFieldData();
            DeleteFieldOptions(deleteIds);
        }
    });


    $("#btnAddField").on('click', function () {
        var valid = $("#frmAddFieldoptions").valid();
        if (valid) {
            AddSelectedFieldOptions();
        }
    });

    function submitFieldData() {     
        if ($("#Datatype").val() == "dropdown" || $("#Datatype").val() == "checkbox" || $("#Datatype").val() == "radiobutton") {
            var data = document.getElementsByClassName('fields_added');
            var numberOfRows = data.length;
            if (numberOfRows == 0) {
                return toastr.warning("Please Insert Value in Field Options");
            }
        }
        var isValid = $("#frmField").valid();
        if (isValid) {
      //      StartLoader($("#btnFieldSave")[0]);
            var fieldoptionsdata = [];  
            var data = document.getElementsByClassName('fields_added'); 
            var numberOfRows = data.length;
            var FieldId = $('#Id').val();
            for (var i = 0; i < numberOfRows; i++) {
                var id = $(data[i]).attr('data-id');
                var displayorder = i + 1;
                var value = $(data[i]).find('.formlisted-content > p').attr('data-value');
               // var value = $($(data[i]).children().children()[0]).attr('data-value');
                fieldoptionsdata.push({ Id: id, Value: value, FieldId: FieldId, DisplayOrder: displayorder });
            }
            var user = {
                Id: $("#Id").val(),
                Name: $("#Name").val(),
                Datatype: $("#Datatype").val(),
                Description: $('#Description').val(),
                BusinessId: $('#BusinessId').val()
            }
            console.log(fieldoptionsdata);
            $.ajax({
                url: "/Field/SaveField",
                type: "POST",
                data: { addfield: user, Fieldoptions: fieldoptionsdata },
                success: function (data) {
                   // StopLoading();
                    data = JSON.parse(data);
                    if (data.IsSuccess == false) {
                      //  StopLoader($("#btnFieldSave")[0]);
                        toastr.warning(data.Message, 'Warning');
                    } else {
                      //  StopLoader($("#btnFieldSave")[0]);
                        toastr.success(' Field saved successfully', 'success');
                        setTimeout(() => { window.location.href = "/Field"    }, 800);
                    }
                },
                error: function (errormessage) {
                 //   StopLoader($("#btnFieldSave")[0]);
                    toastr.error(errormessage.responseText.toString(), 'error');
                }
            });
        } else {
            return;
        }
    };

    $("#Datatype").on('change', function () {
        $("#Datatype").valid();
    });

    $("#btnFieldSave").on('click', function () {
       
        $("#frmField").validate();
    });
    $("#btnAddField").on('click', function () {
        $("#frmAddFieldoptions").validate();
    });

    $(document).on('change', '#Datatype', function () {
        var field = $("#Datatype").val();
        if (field.length == 0) {
            $("#errNm2").text("Please select any Field");
            return false;
        }
        else {
            $("#errNm2").text("");
            $("#errNm2").prop('hidden', true);
        }
    });

    function StartLoading() {
        $("#btnFieldSave").prop('disabled', true);
        $("i#saveicon").removeClass('fa-floppy-o').addClass('fa-spinner fa-pulse');
    }

    function StopLoading() {
        $("#btnFieldSave").prop('disabled', false);
        $("i#saveicon").removeClass('fa-spinner fa-pulse').addClass('fa-floppy-o');
    }

});

function AddSelectedFieldOptions(id) {
    var html = '';
    var optionId = parseInt($('#option-id').val());
    var input = $('#addFieldoptions').val();
    if (input == "") {
        toastr.warning("Please Insert Value in Form Options");
    }
    else {
        if (optionId > 0) {
            $('#text_' + optionId).text(input);
            $('#text_' + optionId).attr('value', input);
            $('#text_' + optionId).attr('data-value', input);
            console.log(input);
        } else {
            var index = fieldoption_index++;
            html += `<div class="form-icon mb-2 fields_added" id="div_` + index + `" data-id="0">
                      <div class="formlisted-content">
                    <p class="form-control form-control-icon-right" id="text_` + index + `" data-value="` + input + `">` + input + `</p>
                      </div>
                    
                     <div class="table-resource-buttons position-absolute">
                                                        <a href="javascript:void(0);"  data-id="` + index + `">
                                                            <svg width="16" height="16" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M19.629 8.818l7.553 7.555L9.554 34H2v-7.555L19.629 8.816v.002zM22.146 6.3l3.777-3.779a1.78 1.78 0 012.518 0L33.48 7.56a1.78 1.78 0 010 2.518L29.7 13.854 22.147 6.3z" fill="#281483"></path></svg>
                                                        </a>
                                                        <a href="javascript:void(0);"  data-id="` + index + `">
                                                            <svg width="16" height="16" data-name="Layer 1" viewBox="0 0 18.33 22.42" xmlns="http://www.w3.org/2000/svg"><path d="M31.45,42V36.34a1,1,0,0,1,2-.17V47.44a2,2,0,0,0,2,2.05h8.12a2,2,0,0,0,2.05-2.05V36.34a1,1,0,0,1,.81-1.09,1,1,0,0,1,1.21.83,1.83,1.83,0,0,1,0,.33V47.47a4,4,0,0,1-3.33,4,4.37,4.37,0,0,1-.72.06H35.49a4,4,0,0,1-4-4Z" transform="translate(-30.43 -29.11)" fill="#281483"></path><path d="M43.67,32.17h.72c1.1,0,2.2,0,3.3,0a1,1,0,0,1,1,1.31,1,1,0,0,1-.89.73H31.54a1,1,0,1,1,0-2h4v-2a1,1,0,0,1,1.06-1.07h6a1,1,0,0,1,1.07,1.07Zm-6.1,0h4v-1h-4Z" transform="translate(-30.43 -29.11)" fill="#281483"></path><path d="M36.54,41.82c0-1.18,0-2.37,0-3.55a1,1,0,0,1,.83-1,1,1,0,0,1,1.1.58,1.25,1.25,0,0,1,.1.51q0,3.48,0,7a1,1,0,0,1-1,1.1,1,1,0,0,1-1-1.1Z" transform="translate(-30.43 -29.11)" fill="#281483"></path><path d="M42.65,41.85c0,1.19,0,2.37,0,3.56a1,1,0,0,1-1.88.53,1.36,1.36,0,0,1-.15-.59q0-3.51,0-7a1,1,0,1,1,2,0C42.66,39.52,42.65,40.68,42.65,41.85Z" transform="translate(-30.43 -29.11)" fill="#281483"></path></svg>
                                                        </a>
                                                    </div>
                </div>`;

            $("#FieldsDisplay").append(html);
            console.log(input);
        }
        $('#addFieldoptions').val('');
        $('#option-id').val('');
    }
}

function DeleteItemConfirm(Id) {
    $("#delete").appendTo("body").modal('show');
    $("#deleteId").val(Id);
}

function DeleteItem() {
    var Id = $("#deleteId").val();
    $.ajax({
        type: "POST",
        url: "/Field/DeleteField",
        data: { id: Id },
        success: (data) => {
            if (data === "success") {
                setTimeout(function () { location.reload(); }, 800);
                toastr.success("Deleted Sucessfully..!!", 'Success');
            } else {
                toastr.warning(data, 'Warning');
            }
        },
        error: function (errormessage) {
            toastr.error(errormessage.responseText.toString(), 'Error');
        }
    });
}

function DeleteFieldOptions(deleteIds) {
    $.ajax({
        type: "POST",
        url: "/Field/DeleteFieldOptions",
        data: { DeleteFieldOptions: deleteIds },
        success: (data) => {
            if (data === "success") {
                toastr.success(data, 'Success');
            }
        },
        error: function (errormessage) {
            toastr.error(errormessage.responseText.toString(), 'Error');
        }
    });
}



function LoadField() {

    var startDate = $("#startdate").val();
    var endDate = $("#enddate").val();
    table = $('#Field-table').DataTable({

        destroy: true,
        processing: true,
        serverSide: true,
        filter: true,
        orderMulti: true,
        order: [],
        responsive: true,
        scrollCollapse: false,
        ordering: true,
        lengthChange: true,
        paging: true,
        pagingType: "full_numbers",
        pageLength: 10,
        ajax: {
            url: "/Field/GetFieldList",
            type: "POST",
            datatype: "json",
      
            dataSrc: function (json) {
                $("#totalRecords").text(json.recordsTotal);
                console.log(json);
                return json.data;
            }
        },
        columns: [
            {
                data: "name",
                title: "Name",
                render: function (data, type, row) {
                    return `<a href="#" class="link-table">${data || "N/A"}</a>`;
                },
            },
            {
                data: "datatype",
                title: "Datatype",
                render: function (data, type, row) {
                    return `${data || "N/A"} </span>`;
                },
            },
            {
                data: "description",
                title: "Description",
                render: function (data, type, row) {
                    return `<div>${data || "N/A"}</div>`;
                },
            },
            {
                data: "id",
                title: "Actions",
                render: function (data, type, row) {
                    return `
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">
                            <a href="/Field/AddField?Id=${data}" class="btn btn-sm btn-icon mr-1 float-left btn-info">
                                <svg width="16" height="16" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.629 8.818l7.553 7.555L9.554 34H2v-7.555L19.629 8.816v.002zM22.146 6.3l3.777-3.779a1.78 1.78 0 012.518 0L33.48 7.56a1.78 1.78 0 010 2.518L29.7 13.854 22.147 6.3z" fill="#281483"></path>
        </svg>
                            </a>
                        </span>
                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">
                            <a onclick="DeleteItemConfirm(${data})" class="btn btn-sm btn-icon mr-1 float-left btn-danger" data-toggle="modal" data-target="#delete" title="Delete">
                                <svg width="16" height="16" viewBox="0 0 18.33 22.42" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.45,42V36.34a1,1,0,0,1,2-.17V47.44a2,2,0,0,0,2,2.05h8.12a2,2,0,0,0,2.05-2.05V36.34a1,1,0,0,1,.81-1.09,1,1,0,0,1,1.21.83,1.83,1.83,0,0,1,0,.33V47.47a4,4,0,0,1-3.33,4,4.37,4.37,0,0,1-.72.06H35.49a4,4,0,0,1-4-4Z" transform="translate(-30.43 -29.11)" fill="#281483"></path>
            <path d="M43.67,32.17h.72c1.1,0,2.2,0,3.3,0a1,1,0,0,1,1,1.31,1,1,0,0,1-.89.73H31.54a1,1,0,1,1,0-2h4v-2a1,1,0,0,1,1.06-1.07h6a1,1,0,0,1,1.07,1.07Zm-6.1,0h4v-1h-4Z" transform="translate(-30.43 -29.11)" fill="#281483"></path>
            <path d="M36.54,41.82c0-1.18,0-2.37,0-3.55a1,1,0,0,1,.83-1,1,1,0,0,1,1.1.58,1.25,1.25,0,0,1,.1.51q0,3.48,0,7a1,1,0,0,1-1,1.1,1,1,0,0,1-1-1.1Z" transform="translate(-30.43 -29.11)" fill="#281483"></path>
            <path d="M42.65,41.85c0,1.19,0,2.37,0,3.56a1,1,0,0,1-1.88.53,1.36,1.36,0,0,1-.15-.59q0-3.51,0-7a1,1,0,1,1,2,0C42.66,39.52,42.65,40.68,42.65,41.85Z" transform="translate(-30.43 -29.11)" fill="#281483"></path>
        </svg>
                            </a>
                        </span>
                    `;
                },
            }
        
        ],
    });

    table.on('draw.dt', function () {
        $('[data-bs-toggle="tooltip"]').tooltip({
            "html": true
        });


    });
}
