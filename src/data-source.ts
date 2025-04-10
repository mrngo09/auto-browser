// src/data-source.ts
import { DataSource } from "typeorm";
import { Account } from "./entities/Account";
import { BankAccount } from "./entities/BankAccount";
import { ProxySockS5 } from "./entities/ProxySockS5";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "HayTech@2025",
    database: "bankcrawler",
    synchronize: true, // Caution: Only use in development
    // logging: true,
    entities: [Account, BankAccount, ProxySockS5],
    subscribers: [],
    migrations: [],
})