import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CarModelsController } from './carModels.controller';
import { CarModelsService } from './carModels.service';
import { CarModelSchema } from './carModel.model';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CarModel', schema: CarModelSchema }]),
    CarsModule,
  ],
  controllers: [CarModelsController],
  providers: [CarModelsService],
})
export class CarModelsModule {}
