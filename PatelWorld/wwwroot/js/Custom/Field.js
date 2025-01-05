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
            StartLoader($("#btnFieldSave")[0]);
            var fieldoptionsdata = [];  
            var data = document.getElementsByClassName('fields_added'); 
            var numberOfRows = data.length;
            var FieldId = $('#Id').val();
            for (var i = 0; i < numberOfRows; i++) {
                var id = $(data[i]).attr('data-id');
                var displayorder = i + 1;
                var value = $($(data[i]).children().children()[0]).attr('data-value');
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
                    StopLoading();
                    data = JSON.parse(data);
                    if (data.IsSuccess == false) {
                        StopLoader($("#btnFieldSave")[0]);
                        toastr.warning(data.Message, 'Warning');
                    } else {
                        StopLoader($("#btnFieldSave")[0]);
                        toastr.success(' Field saved successfully', 'success');
                        setTimeout(() => { window.location = data.Message; }, 800);
                    }
                },
                error: function (errormessage) {
                    StopLoader($("#btnFieldSave")[0]);
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
                    <div class="form-icon-right">
                       <a href="javascript:void(0);" role="button" class="btn btn-sm btn-icon btn-light greybroder mr-2 editField" data-id="` + index + `">
                         <i class="ri-pencil-line"></i>
                        </a>
                        <a href="javascript:void(0);" role="button" class="btn btn-sm btn-icon btn-light greybroder deleteField" data-id="` + index + `">
                          <i class="ri-delete-bin-fill"></i>
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