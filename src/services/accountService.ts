// src/services/AccountService.ts
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Account } from "../entities/Account";

export class AccountService {
  private accountRepository: Repository<Account>;

  constructor() {
    this.accountRepository = AppDataSource.getRepository(Account);
  }

  async createAccount(account: Partial<Account>): Promise<any> {
    try {
      const newAccount = this.accountRepository.create(account);
      console.log(`Save account to db success: ${newAccount}`);

      return this.accountRepository.save(newAccount);
    } catch (error) {
      console.log(`Error en AccountService: ${error}`);

    }
  }

  async getAccount(id: number): Promise<any> {
    return this.accountRepository.findOne({ where: { id } });
  }

  // async getAllAccounts(): Promise<any[]> {
  //   return this.accountRepository.find();
  // }

  // async updateAccount(id: number, account: Partial<any>): Promise<any> {
  //   await this.accountRepository.update(id, account);
  //   return this.accountRepository.findOneOrFail({ where: { id } });
  // }

  // async deleteAccount(id: number): Promise<void> {
  //   await this.accountRepository.delete(id);
  // }
}