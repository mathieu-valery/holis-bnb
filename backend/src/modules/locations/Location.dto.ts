import { IsNumber, IsString, IsOptional, IsPositive } from 'class-validator';
export class CreateLocationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsString()
  picture: string;

  @IsNumber()
  stars: number;

  @IsNumber()
  numberOfRooms: number;

  @IsNumber()
  price: number;

  @IsString()
  categoryName: string;
}
export class GetLocationsDto {
  @IsOptional()
  @IsString()
  title: string;
}

export class UpdateLocationPriceDto {
  @IsNumber()
  @IsPositive()
  price: number;
}
