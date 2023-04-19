import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './models/cars/cars.module';
import { CarModelsModule } from './models/carModels/carModels.module';

@Module({
  imports: [
    // core modules
    ConfigModule.forRoot(),

    // user generated modules
    CarsModule,
    CarModelsModule,

    // mongoose modules
    MongooseModule.forRoot(process.env.MONGODB_API),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
