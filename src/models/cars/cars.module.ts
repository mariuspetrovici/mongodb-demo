import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CarSchema } from './car.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }])],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
