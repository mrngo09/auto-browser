import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProxySockS5 {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column() // Store IP:PORT combination
    server: string = "";

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date = new Date();

    @UpdateDateColumn()
    updatedAt?: Date;
}