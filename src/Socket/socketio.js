import io from 'socket.io-client';
import { Base_url } from '../Baseurl';
 export const CreateSocketConnection=()=>{

    return io(Base_url);
};


/*
io is the function you import from the socket.io-client library.

It is used to create a connection to a Socket.IO server.

When you call io(Base_url), you're telling the client to connect to a Socket.IO server that's running at the URL you pass.

io('http://localhost:8888');
This opens a WebSocket (or fallback HTTP) connection to the server and enables real-time data exchange.



*/