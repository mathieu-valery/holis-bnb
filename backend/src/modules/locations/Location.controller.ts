import { Controller, Get, Param, Query, Put, Body, Patch } from '@nestjs/common';
import { LocationService } from './Location.service';
import { Request } from 'express';
import { GetLocationsDto, UpdateLocationPriceDto } from './Location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /** List all locations in database with this endpoint */
  @Get()
  async getLocations(@Query() query: GetLocationsDto) {
    if (Object.keys(query).length) {
      return await this.locationService.getLocationsByName(query.title);
    }
    return await this.locationService.getLocations();
  }
  @Get(':id')
  async getLocation(@Param('id') id: string) {
    return await this.locationService.getLocation(id);
  }
  @Patch(':id')
  async updatePrice(
    @Param('id') id: string,
    @Body() body: UpdateLocationPriceDto,
  ) {
    return await this.locationService.updateLocationPrice(id, body);
  }
}
