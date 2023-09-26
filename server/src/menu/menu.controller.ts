import { MenuService } from './menu.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CreateMenuDto from './dtos/create-menu';

@Controller('menu')
export class MenuController {
  constructor(public menuService: MenuService) {} // Inject menuService into MenuController to use it in the controller's methods.
  // Get all menu:
  @Get()
  async findAll() {
    return await this.menuService.findAll();
  }
  // Get menu by id:
  @Get('/:id')
  async getMenuById(@Param('id') id: string) {
    return await this.menuService.findOne(id);
  }
  //Create a menu:
  @Post()
  createMenu(@Body() body: CreateMenuDto) {
    return this.menuService.createMenu(body);
  }
  //Update a menu:
  @Put('/:id')
  async updateMenu(@Param('id') id: string, @Body() body: CreateMenuDto) {
    return await this.menuService.updateMenu(id, body);
  }
  //Delete a menu:
  @Delete('/:id')
  deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }

  //Change menu status:
  @Put('/status/:id')
  changeMenuStatus(@Param('id') id: string) {
    return this.menuService.changeMenuStatus(id);
  }
}
