import { Router } from 'express';

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import {
  validateIdParam,
  validateJobInput,
} from '../middleware/validationMiddleware.js';

const router = Router();
// router.get('/', getAllJobs);
// router.post('/', createJob);

// All jobs, create job
router.route('/').get(getAllJobs).post(validateJobInput, createJob);

// Single job
router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(validateJobInput, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
