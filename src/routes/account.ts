import { Router } from 'express';
import { AccountService } from '../services/accountService';
import { AccountController } from '../controllers/accountController';

const router = Router();
const accountService = new AccountService();
const accountController = new AccountController(accountService);

router.post('/', (req, res) => accountController.create(req, res));
router.get('/:id', (req, res) => accountController.getById(req, res));
// Add other routes

export default router;