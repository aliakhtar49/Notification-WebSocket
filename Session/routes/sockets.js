
var io = require('socket.io');                                 //importing socket.io module and load it on a variable name io
exports.initialize = function(server)                          //The initialize method will accept the HTTP server object as a parameter. This is required by socket.io:


{
    io = io.listen(server);                                    //socket.io works as a communication layer so it will listen in which the server is listening that's why we we give main server as a parameter
    io.sockets.on("connection", function(socket)               //The first event that our server will receive is a new connection from a new client.  This is identified by the connection event on the io.sockets object and notifies our application that a new client has opened a new connection and all the protocol negotiation (transparent to us) has been completed and now we have a socket to communicate with this client:
    {


        /*  The socket.send method will send the message on the socket, which will be
         triggering the message event on the client. The message sent has to be a string key,
         so we will use JSON.stringify to send the data for the message as a string.Also
         it is emitting a event.while working on socket if event emit on server client handler
          will work or vice versa--------------------------------------------------------
         -------------------------------------------------------------------------------*/
        socket.send
            (JSON.stringify
            (
            {
                type:'serverMessage',
                message: 'Welcome to the most interesting Notification on earth!'
            }
            )
            );
        /*------------------------------------------------------------------------------------
          ------------------------------------------------------------------------------
             -----------------------------------------------------------------*/



        /*  One part of our task is over, we are now able to welcome the user. The next task is
         to handle the other user  messages when they come in. For this, we set a message event
         handler on the socket:-------------------------------------------------------
         Just like any other event connector, socket.on will take two parameters, namely the
         event to handle and the event handler for it.-----------------------------------
         Now, we have to send out this message to all the connected users. For this, socket.
         io provides us with a broadcast object. When we send the message using the
         broadcast object, it will be sent to all the clients that are connected, except to the
         one for which this socket was created.--------------------------------------------
         -------------------------------------------------------------------------------*/
                socket.on('message', function(message)
                {
                    message= JSON.parse(message);
                    if(message.type == "userMessage")
                    {
                        socket.broadcast.send(JSON.stringify(message));
                        message.type = "myMessage";
                        socket.send(JSON.stringify(message));
                    }
                });

        /*------------------------------------------------------------------------------------
         ------------------------------------------------------------------------------
         -----------------------------------------------------------------*/


    });
};