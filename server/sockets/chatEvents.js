/**
 * Chat socket/events
 */

module.exports = function(sockIO){
    sockIO.on('connection', function(socket){
        console.log('a user connected',socket);
      });
}