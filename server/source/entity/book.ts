import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    book_id!: string;
    @Column()
    book_author!: string;
    @Column()
    book_title!: string;
    @Column()
    book_create_time!: string;
    @Column()
    book_update_time!: string;
}
