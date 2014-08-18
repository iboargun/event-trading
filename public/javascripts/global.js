/**
 * Created by iargun on 19.08.14.
 */

$(function() {

    // Delete Method
    $("[data-method='deleteUser']").on("click", function(){

        event.preventDefault();

        // Pop up a confirmation dialog
        var confirmation = confirm('Are you sure you want to delete this user?');

        // Check and make sure the user confirmed
        if (confirmation === true) {

            // If they did, do our delete
            $.ajax({
                type: 'DELETE',
                url: '/users/delete/' + $(this).attr('href')
            }).done(function( response ) {

                // Check for a successful (blank) response
                if (response.msg === '') {
                    alert('Message: ' + response.msg);
                }
                else {
                    alert('Error: ' + response.msg);
                }


            });

        }
        else {

            // If they said no to the confirm, do nothing
            return false;

        }

    });

});