import { Router } from 'express';

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js';
import {
  // validateIdParam,
  validateJobInput,
} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

const router = Router();
// router.get('/', getAllJobs);
// router.post('/', createJob);

// All jobs, create job
router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

// Stats
router.route('/stats').get(showStats);

// Single job
router
  .route('/:id')
  .get(getJob)
  .patch(checkForTestUser, validateJobInput, updateJob)
  .delete(checkForTestUser, deleteJob);

export default router;
