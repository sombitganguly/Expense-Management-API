import { Router } from 'express';
import authRouter from './auth';
import personalExpenseRouter from './expense';

const router = Router();

router.use('/auth', authRouter);
router.use('/personal-expense', personalExpenseRouter);

export default router;