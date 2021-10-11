import { Field } from '@nestjs/graphql';
import { number } from 'joi';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(() => number)
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
