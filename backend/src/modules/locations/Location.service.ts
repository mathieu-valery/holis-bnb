import { Category } from './../categories/Category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Location } from './Location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createLocation(body) {
    const findedCategory = await this.categoryRepository.findOne({
      name: body.categoryName,
    });
    const { categoryName, ...locationPayload } = body;
    if (findedCategory) {
      const newLocation = await this.locationRepository.create({
        ...locationPayload,
        categoryId: findedCategory.id,
      });
      return this.locationRepository.save(newLocation);
    } else {
      const newCategory = await this.categoryRepository.create({
        name: body.categoryName,
        description: 'New Description',
      });
      const createdCategory = await this.categoryRepository.save(newCategory);
      const newLocation = await this.locationRepository.create({
        ...locationPayload,
        categoryId: createdCategory.id,
      });
      return this.locationRepository.save(newLocation);
    }
  }

  async getLocations() {
    return await this.locationRepository.find();
  }

  async getLocationsByName(title: string) {
    return await this.locationRepository.find({
      title: ILike(`%${title}%`),
    });
  }

  async getLocation(id: string) {
    return await this.locationRepository.findOne(id);
  }

  async updateLocationPrice(id: string, body) {
    const location = await this.locationRepository.findOne(id);
    return this.locationRepository.save({
      ...location,
      ...body,
    });
  }

  async deleteLocation(id: string) {
    const location = await this.locationRepository.findOne(id);
    return this.locationRepository.delete(location);
  }
}
