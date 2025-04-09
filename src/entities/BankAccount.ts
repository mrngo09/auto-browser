// src/entities/Account.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BankAccount {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    account_no: string = "";

    @Column()
    account_name: string = "";

    @Column()
    bank_name: string = "";

    @CreateDateColumn()
    createdAt: Date = new Date();

    @UpdateDateColumn()
    updatedAt?: Date;
}