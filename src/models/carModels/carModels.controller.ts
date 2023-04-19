import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { CarModelsService } from './carModels.service';

@Controller('car_models')
export class CarModelsController {
  constructor(private readonly carModelsService: CarModelsService) {}

  @Post()
  async addCarModel(
    @Body('name') carModelName: string,
    @Body('make') carMakeName: string,
    @Body('year') carModelYear: number,
    @Body('isLuxury') carModelIsLuxury: boolean,
  ) {
    try {
      const result = await this.carModelsService.addCarModel(
        carModelName,
        carMakeName,
        carModelYear,
        carModelIsLuxury,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAllCarModels() {
    const carModels = await this.carModelsService.getCarModels();
    return carModels;
  }

  @Get(':id')
  getCarModel(@Param('id') carModelId: string) {
    return this.carModelsService.getSingleCarModel(carModelId);
  }

  @Patch(':id')
  async updateCarModel(
    @Param('id') carModelId: string,
    @Body('name') carModelName: string,
    @Body('make') carMakeName: string,
    @Body('year') carModelYear: number,
    @Body('isLuxury') carModelIsLuxury: boolean,
  ) {
    await this.carModelsService.updateCarModel({
      id: carModelId,
      name: carModelName,
      make: carMakeName,
      year: carModelYear,
      isLuxury: carModelIsLuxury,
    });
    return null;
  }

  @Delete(':id')
  async removeCarModel(@Param('id') carModeldId: string) {
    await this.carModelsService.deleteCarModel(carModeldId);
    return null;
  }
}
