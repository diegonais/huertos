import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 50 })
    name: string;

    @Column({ type: 'jsonb', nullable: true })
    permissions?: any;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', nullable: true })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
    updatedAt?: Date;
}
