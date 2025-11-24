import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../roles/entities/role.entity';

@Entity('users')
export class User {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ unique: true, length: 255 })
    email: string;

    @Column({ name: 'password_hash', length: 512 })
    passwordHash: string;

    @Column({ length: 200, nullable: true })
    name?: string;

    @Column({ length: 50, nullable: true })
    phone?: string;

    @ManyToOne(() => Role, { eager: true, nullable: true })
    @JoinColumn({ name: 'role_id' })
    role?: Role;

    @Column({ name: 'preferred_timezone', length: 50, default: 'America/La_Paz' })
    preferredTimezone: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @BeforeInsert()
    setId() {
        if (!this.id) this.id = uuidv4();
    }
}
