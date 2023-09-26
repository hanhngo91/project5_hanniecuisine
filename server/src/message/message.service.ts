import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { Repository } from 'typeorm';
import CreateMessage from './dtos/create-message';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageEntity: Repository<MessageEntity>,
  ) {}
  //Find all messages:
  async findAll(): Promise<MessageEntity[]> {
    return await this.messageEntity.find({
      order: {
        createdDate: 'DESC',
      },
    });
  }

  //Create a new message:
  async createMessage(body: CreateMessage) {
    const newMessage = this.messageEntity.create({
      ...body,
      firstName: body.firstName.toLowerCase(),
      lastName: body.lastName.toLowerCase(),
      email: body.email.toLowerCase(),
      tel: body.tel.toLowerCase(),
      subject: body.subject.toLowerCase(),
      message: body.message.toLowerCase(),
    });
    return {
      message: 'New message created successfully!',
      data: await this.messageEntity.save(newMessage),
    };
  }

  //Delete a message:
  async deleteMessage(id: string) {
    const message = await this.messageEntity.findOne({
      where: { messageId: id },
    });
    if (!message) {
      return {
        message: 'Message not found!',
      };
    }
    await this.messageEntity.delete(id);
    return {
      message: 'Message deleted successfully!',
    };
  }
}
