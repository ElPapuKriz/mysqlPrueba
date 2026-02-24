import { Router } from 'express';
import { createUser, getUserById, getUsers } from '../controllers/user.controller';
/* import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller';
 */

const router = Router();

router.get('/',getUsers)
router.get('/:id',getUserById)
router.post("/",createUser)

export default router;