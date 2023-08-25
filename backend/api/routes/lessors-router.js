import express from "express";
import * as lessorsController from '../controllers/lessor-controller.js';
const router = express.Router(); // get router object

// route for 'get' (fetch all Lessors) and 'post' requests on endpoint '/lessors' 
router.route('/lessors')
      .post(lessorsController.post)
      .get(lessorsController.index)

//route for 'get', 'put' and 'delete' for single instance of lessor based on request parameter 'id'
router.route('/lessors/:id')
      .put(lessorsController.update)
      .delete(lessorsController.remove)
      .get(lessorsController.get)

export default router; // export lessors router