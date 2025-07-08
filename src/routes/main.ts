import { Router } from 'express';
import authRouter from './auth';
import personalExpenseRouter from './expense';
import emailRouter from './email';

const router = Router();

router.use('/auth', authRouter);
router.use('/personal-expense', personalExpenseRouter);
router.use('/email-verification', emailRouter);

export default router;