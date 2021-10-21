import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id!: string;
    @Column()
    user_name!: string;
    @Column()
    user_password!: string;
    @Column()
    user_sex!: string;
    @Column()
    user_roles!: string;
    @Column()
    user_create_time!: string;
    @Column()
    user_update_time!: string;
}
