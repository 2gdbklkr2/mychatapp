jQuery(function () {
    //send message to server
    var socket = io();
    jQuery('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', jQuery('#type-message').val());
      jQuery('#type-message').val('');//don't send if there is no text
      return false;
    });
    //add message to page
    socket.on('chat message', function(msg){
      jQuery('#chat-messages').append(jQuery('<div>').text(msg));
    });
  });

