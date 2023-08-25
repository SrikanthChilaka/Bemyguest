import app from './api/app.js';

const port = 9000; // port to run server on

app.listen(port, () =>{console.log(`Server running at port ${port}`)}); // start app and listen to endpoints on port 9000
