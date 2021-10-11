import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<string | undefined> {
    try {
      const exits = await this.users.findOne({ email });
      if (exits) {
        return 'There is a user with that eamil already';
      }
      await this.users.save(this.users.create({ email, password, role }));

      return;
    } catch (error) {
      return 'Could not create an account';
    }
  }
}
