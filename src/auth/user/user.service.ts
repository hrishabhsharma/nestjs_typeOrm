import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username, accountStatus: 1 } });
  }

  async findByMobileNo(mobilePrimary: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mobilePrimary, accountStatus: 1 } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email, accountStatus: 1 } });
  }
}
