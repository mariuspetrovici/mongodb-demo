import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async addCar(
    @Body('name') carName: string,
    @Body('nr_of_models') carNrOfModels: number,
    @Body('average_horsepower') carAverageHorsePower: number,
    @Body('average_price') carAveragePrice: number,
  ) {
    try {
      const result = await this.carsService.addCar(
        carName,
        carNrOfModels,
        carAverageHorsePower,
        carAveragePrice,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAllCars() {
    const cars = await this.carsService.getCars();
    return cars;
  }

  @Get(':id')
  getCar(@Param('id') carId: string) {
    return this.carsService.getSingleCar(carId);
  }

  @Patch(':id')
  async updateCar(
    @Param('id') carId: string,
    @Body('name') carName: string,
    @Body('nr_of_models') carNrOfModels: number,
    @Body('average_horsepower') carAverageHorsePower: number,
    @Body('average_price') carAveragePrice: number,
  ) {
    await this.carsService.updateCar({
      id: carId,
      name: carName,
      nr_of_models: carNrOfModels,
      average_horsepower: carAverageHorsePower,
      average_price: carAveragePrice,
    });
    return null;
  }

  @Delete(':id')
  async removeCar(@Param('id') carId: string) {
    await this.carsService.deleteCar(carId);
    return null;
  }
}
