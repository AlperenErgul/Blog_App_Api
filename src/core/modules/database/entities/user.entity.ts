import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {PostEntity} from "./post.entity";


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => PostEntity, (postEntity: PostEntity) => postEntity.user)
    @JoinColumn()
    posts: PostEntity[];

    @Column({ type: 'varchar', nullable: true })
    profileImageKey: string | null; // S3'teki key

    @Column({ type: 'varchar', nullable: true })
    profileImageUrl: string | null; // Cloudfront Url'i

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    getProfileImageUrl(): string | null{
        return this.profileImageUrl || null;
    }

    hasProfileImage(): boolean{
        return !!this.profileImageKey;
    }
}
