import leaseesRouter from './leasees-router.js';
import lessorsRouter from './lessors-router.js';
import roomsRouter from './rooms-router.js';

// method to mount Leasee, Lessor and Room Router to input app for routing to all endpoints with base url '/'
export default (app) => {
   app.use('/', leaseesRouter);
   app.use('/',lessorsRouter);
   app.use('/', roomsRouter);
}
