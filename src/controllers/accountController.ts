import { Request, Response } from 'express';
import { AccountService } from '../services/accountService';

export class AccountController {
    constructor(private accountService: AccountService) { }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const account = await this.accountService.createAccount(req.body);
            res.status(201).json(account);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create account' });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const account = await this.accountService.getAccount(parseInt(req.params.id));
            if (!account) {
                res.status(404).json({ error: 'Account not found' });
                return;
            }
            res.json(account);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch account' });
        }
    }

    // Similar methods for getAll, update, delete
}