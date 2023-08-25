import express from "express";
import * as leaseesController from '../controllers/leasee-controller.js';
const router = express.Router(); // get router object

// route for 'get' (fetch all Leasees) and 'post' requests on endpoint '/leasees' 
router.route('/leasees')
      .post(leaseesController.post)
      .get(leaseesController.index)

//route for 'get', 'put' and 'delete' for single instance of Leasee based on request parameter 'id'
router.route('/leasees/:id')
      .put(leaseesController.update)
      .delete(leaseesController.remove)
      .get(leaseesController.get)

export default router; // export leasees router