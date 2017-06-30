$(document).ready(function () {
    $('#addItem').on('click', addItem);
    //   .on('change') works better than click on checkboxes
    $('#list').on('change', '#check', completeItem);
    $('#list').on('click', '.glyphicon-trash', deleteItem);

    function addItem() {
        //      Get input
        var newItem = $('#newTodo').val();
//      If (To not create empty notes) 
        if (newItem != "") {
            //      Append newItem to list
            $('#list').append('<li><input type="checkbox" id="check">' + newItem + '<span class="glyphicon glyphicon-trash"></li>');
            $('#newTodo').val("");
            //      Prevents jquery from deleting it immediately
            event.preventDefault();
        } else {
            event.preventDefault();

        }
    }

    function deleteItem() {
        $(this).parent().remove();

    }

    function completeItem() {
        $(this).parent().toggleClass('done');
    }


})
