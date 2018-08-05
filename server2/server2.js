var WebSocketServer = new require('ws');
// подключенные клиенты
var clients = {};

// WebSocket-server on port 8081
var webSocketServer = new WebSocketServer.Server({
  port: 8081
});

console.log('server listens on port 8081')

webSocketServer.on('connection', ws => {
        
        var id = Math.random();
        
        const dice = (sides) => {
          let succes = 1 + Math.random() * 10 | 0;  
          if (succes !== 1) return 1 + Math.random() * sides | 0;  
          else return new Error('The dice has landed on its edge!')
        }
        
        clients[id] = ws;
        console.log(`new connection: ${id}`);
        
        ws.onmessage = () => {
            let diceResult = dice(6);
            let message = diceResult instanceof Error ? diceResult.message : diceResult;
            console.log('recieved dice request');
            clients[id].send(message);
            console.log(`Sending dice throw result (${message})`);            
        }
        
        ws.on('close', () => {
            console.log(`connection closed: ${id}`)
            delete clients[id]
        })
    }
)

