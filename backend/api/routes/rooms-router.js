import express from "express";
import * as roomsController from '../controllers/room-controller.js';
const router = express.Router(); // get router object

// route for 'get' (fetch all rooms) and 'post' requests on endpoint '/rooms' 
router.route('/rooms')
      .post(roomsController.post)
      .get(roomsController.index)

//route for 'get', 'put' and 'delete' for single instance of room based on request parameter 'id'
router.route('/rooms/:id')
      .put(roomsController.update)
      .delete(roomsController.remove)
      .get(roomsController.get)

export default router; // export rooms router