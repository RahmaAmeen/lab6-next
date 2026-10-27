import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentService } from '../student/student.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from './dto/RegisterReqestDto';
import { ObjectId, Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: StudentService,
    private jwtService: JwtService,
  ) {}
  async register(user: RegisterRequestDto): Promise<string> {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: RegisterRequestDto = { ...user, password: hashedPassword };
    await this.usersService.create(newUser);
    return 'registered successfully';
  }

  // auth.service.ts

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    payload: { userid: string; role: string };
  }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid email or password');

    const payload = { userid: String(user._id), role: user.role };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token, payload }; // <- include payload for your controller
  }
}
