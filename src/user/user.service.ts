import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './createUser.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto, req): Promise<any> {
    // console.log('request: ' + req?.user);
    if (createUserDto.email === '') {
      return 'email can not be empty';
    } else {
      const ifexits = this.userModel.find({ email: createUserDto.email });
      console.log('res:' + ifexits);
      if (ifexits) {
        return 'email already exits';
      } else {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
      }
    }

    // const result = this.userModel.create(createUserDto);
    // return result;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
