import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import CreateMenuDto from './dtos/create-menu';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  //Find all menus:
  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find({
      order: { uploadDate: 'ASC' },
    });
  }
  //Find a menu:
  async findOne(id: string): Promise<Menu | null> {
    return await this.menuRepository.findOneBy({
      menuId: id,
    });
  }
  //Create a menu:
  async createMenu(body: CreateMenuDto) {
    const newMenu = this.menuRepository.create({
      menuName: body.menuName,
      image: body.image,
      price: body.price,
    });
    return {
      message: 'Menu created successfully',
      menu: await this.menuRepository.save(newMenu),
    };
  }
  //Update a menu:
  async updateMenu(id: string, body: CreateMenuDto) {
    console.log('Update menu-->', id, body);

    try {
      const foundMenu = await this.findOne(id);
      if (foundMenu) {
        const updatedMenu = Object.assign(foundMenu, body);

        return {
          message: 'Menu updated successfully',
          menu: await this.menuRepository.save(updatedMenu),
        };
      } else {
        return { message: 'Menu not found in update!' };
      }
    } catch (err) {
      console.log('Update menu error-->', err);
    }
  }
  //Delete a menu:
  async deleteMenu(id: string) {
    try {
      const foundMenu = await this.findOne(id);
      if (foundMenu) {
        await this.menuRepository.delete(id);
        return { message: 'Menu deleted successfully' };
      } else {
        return { message: 'Menu not found in delete!' };
      }
    } catch (err) {
      console.log('Delete menu error-->', err);
    }
  }

  //Change status of menu:
  async changeMenuStatus(id: string) {
    try {
      const foundMenu = await this.findOne(id);
      if (foundMenu) {
        if (foundMenu.menuStatus === 'available') {
          foundMenu.menuStatus = 'unavailable';
          return {
            message: 'Menu status changed to unavailable',
            menu: await this.menuRepository.save(foundMenu),
          };
        } else if (foundMenu.menuStatus === 'unavailable') {
          foundMenu.menuStatus = 'available';
          return {
            message: 'Menu status changed to available',
            menu: await this.menuRepository.save(foundMenu),
          };
        }
      } else {
        return { message: 'Menu not found in change menu status!' };
      }
    } catch (error) {
      console.log('Change status menu error-->', error);
    }
  }
}
