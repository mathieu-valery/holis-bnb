import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { LocationService } from './Location.service';
import { Request } from 'express';
import { GetFilterLocationDto } from './Location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /** List all locations in database with this endpoint */
  @Get()
  async getLocations(@Query() query: GetFilterLocationDto) {
    if (Object.keys(query).length) {
      return await this.locationService.getLocationsByName(query.title);
    }
    return await this.locationService.getLocations();
  }
}
