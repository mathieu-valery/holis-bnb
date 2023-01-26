import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Patch,
  Post,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LocationService } from './Location.service';
import {
  GetLocationsDto,
  UpdateLocationPriceDto,
  CreateLocationDto,
} from './Location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async createLocation(@Body() body: CreateLocationDto) {
    try {
      return await this.locationService.createLocation(body);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.BAD_GATEWAY, error: error },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get()
  async getLocations(@Query() query: GetLocationsDto) {
    if (Object.keys(query).length) {
      return await this.locationService.getLocationsByName(query.title);
    }
    return await this.locationService.getLocations();
  }

  @Get(':id')
  async getLocation(@Param('id') id: string) {
    try {
      return await this.locationService.getLocation(id);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Location not Found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async updatePrice(
    @Param('id') id: string,
    @Body() body: UpdateLocationPriceDto,
  ) {
    try {
      return await this.locationService.updateLocationPrice(id, body);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: error },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: string) {
    try {
      return await this.locationService.deleteLocation(id);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: error },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
