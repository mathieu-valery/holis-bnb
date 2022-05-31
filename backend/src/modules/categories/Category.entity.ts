import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '../locations/Location.entity';
import { PropertyType } from './Category.enum';

/**
 * TODO implement
 * - You should add relevant fields
 * - You should make sure they are properly decorated for typeorm
 */
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'property_type' })
  propertyType: PropertyType;

  @Column()
  description: string;

  @OneToMany(() => Location, (location) => location.category)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  locations: Location[];
}
