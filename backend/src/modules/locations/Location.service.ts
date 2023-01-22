import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Location } from './Location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async createLocation(body) {
    const newLocation = await this.locationRepository.create(body);
    return this.locationRepository.save({
      ...newLocation,
    });
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
}
