import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import CreateMessage from './dtos/create-message';

@Controller('message')
export class MessageController {
  constructor(public messageService: MessageService) {}
  //Get all messages:
  @Get()
  async findAll() {
    return await this.messageService.findAll();
  }
  //Create a new message:
  @Post()
  async createMessage(@Body() body: CreateMessage) {
    return await this.messageService.createMessage(body);
  }

  //Delete a message:
  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    return await this.messageService.deleteMessage(id);
  }
}
