import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from './auth.model';
import { UserLogInDto } from './dto/user-log-in.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly User: Model<User>) {}

  generateToken(user: any) {
    return jwt.sign({ _id: user._id, email: user.email }, 'SECUREKEY');
  }

  async signUp(userSignUpDto: UserSignUpDto) {
    let user = await this.User.findOne({ email: userSignUpDto.email });
    if (user)
      throw new BadRequestException('User with the same email already found');
    try {
      userSignUpDto.password = await bcrypt.hash(userSignUpDto.password, 12);
      let newUser = new this.User(userSignUpDto);
      await newUser.save();

      const token = this.generateToken(userSignUpDto);
      return { token, newUser };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logIn(userLogInDto: UserLogInDto) {
    let user = await this.User.findOne({ email: userLogInDto.email });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const compare = await bcrypt.compare(userLogInDto.password, user.password);
    if (!compare) throw new UnauthorizedException('Invalid email or password');

    const token = this.generateToken(userLogInDto);
    return { token, user };
  }
}
