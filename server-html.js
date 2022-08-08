const http = require('http');

// first, we create a server
// then connect the server a port
// then create a function that send the message in the response
const PORT = 8080;
const getMessage = () => {
    const hours = new Date().getHours()
    console.log(hours);
    if(hours > 6 && hours <=12){
        return `Good Morning`
    } else if( hours > 12 && hours <=19){
        return `Good Afternoon`
    } else {
        return `Good night`
    }
}
const server = http.createServer((req, res) => {
    res.end(getMessage())
})

const connectedServer = server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})