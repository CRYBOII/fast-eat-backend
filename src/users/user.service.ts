import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
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
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exits = await this.users.findOne({ email });
      if (exits) {
        return { ok: false, error: 'There is a user with that eamil already' };
      }
      await this.users.save(this.users.create({ email, password, role }));

      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Could not create an account' };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'wrong password',
        };
      }

      return { ok: true, token: 'sasdasdas' };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
