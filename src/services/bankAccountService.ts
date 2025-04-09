import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { BankAccount } from "../entities/BankAccount";

export class BankAccountService {
  private accountRepository: Repository<BankAccount>;

  constructor() {

    this.accountRepository = AppDataSource.getRepository(BankAccount);
  }

  async createAccount(bankAccount: Partial<BankAccount>): Promise<any> {
    try {
      // Initialize Data Source if not already initialized
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Data Source initialized for proxy creation.");
      }
      const newAccount = this.accountRepository.create(bankAccount);
      return await this.accountRepository.save(newAccount);
    } catch (error) {
      console.log(`Error en BankAccountService: ${error}`);

    }
  }

  async getAccount(id: number): Promise<any> {
    // Initialize Data Source if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Data Source initialized for proxy creation.");
    }
    return await this.accountRepository.findOne({ where: { id } });
  }

  async getAccountByAccountNo(account_no: string): Promise<any> {
    try {
      // Initialize Data Source if not already initialized
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Data Source initialized for proxy creation.");
      }
      let response = await this.accountRepository.findOne({ where: { account_no } });
      if (response) {
        return response
      }
      return null
    } catch (error) {
      console.log(`Error in BankACcountService: ${error}`);

    }
  }

  // async getAllAccounts(): Promise<any[]> {
  //   return this.accountRepository.find();
  // }

  // async updateAccount(id: number, bankAccount: Partial<any>): Promise<any> {
  //   await this.accountRepository.update(id, bankAccount);
  //   return this.accountRepository.findOneOrFail({ where: { id } });
  // }

  // async deleteAccount(id: number): Promise<void> {
  //   await this.accountRepository.delete(id);
  // }
}