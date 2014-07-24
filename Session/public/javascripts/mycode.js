var socket = io.connect('/');                             //The first step in starting the chat is to connect to the server This will send a connection request to the server from which the page was loaded.  This will also negotiate the actual transport protocol and will finally result in the connection event being triggered on the server app file.
socket.on('message', function (data) {                    //The following code snippet connects the event handler for the message event All we have to do with the incoming message is to append it to the messages area.
    data = JSON.parse(data);
    $('#all_other_user').append('<div class="'+data.type+'">' + data.message +
        '</div>');
});
$(function(){

    /* On clicking the Send button, we create our data object, setting the content of the
     message box as message, and type as userMessage. We can then use the socket.
     send method to send this data to the server.the message will be sent as a sting----
     ---------------------------------------------------------------------------------
     ---------------------------------------------------------------------------------*/
    $('#send').click(function(){
        var data = {
            message: $('#message').val(),
            type:'userMessage'
        };
        socket.send(JSON.stringify(data));
        $('#message').val('');
    });
    /* ----------------------------------------------------------------------------
    * -----------------------------------------------------------------------------
    * ----------------------------------------------------------------------------*/


 });