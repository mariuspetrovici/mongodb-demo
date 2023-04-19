import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CarModel } from './carModel.model';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class CarModelsService {
  constructor(
    @InjectModel('CarModel') private readonly carModelModel: Model<CarModel>,
    private carService: CarsService,
  ) {}

  async addCarModel(
    name: string,
    make: string,
    year: number,
    isLuxury?: boolean,
  ) {
    const carResult = await this.carService.findCarByName(make);

    if (!carResult) {
      throw new NotFoundException(
        `Car with make '${make}' not found. Please add the car before the model.`,
      );
    }

    const newCarModel = new this.carModelModel({
      name,
      make,
      year,
      isLuxury,
    });

    const result = await newCarModel.save();

    /* -- EXERCISE 2 -- */
    const totalMakeModels = await this.carModelModel.find({
      make: new RegExp(make, 'i'),
    });

    if (totalMakeModels.length) {
      this.carService.updateCar({
        id: carResult.id,
        current_models: totalMakeModels.length,
      });
    }
    /* -------------- */

    /* QUERY EXAMPLE */
    const carsWithPrice = await this.carService.findByQuery({
      name: new RegExp(make, 'i'),
      average_price: { $exists: true },
    });

    console.log(
      `There are ${carsWithPrice.length} ${make} cars that have the average_price prop!`,
    );
    /* -------------- */

    return { id: result.id };
  }

  async getCarModels() {
    const carModels = await this.carModelModel.find();
    return carModels.map((prod) => ({
      id: prod.id,
      name: prod.name,
      make: prod.make,
      year: prod.year,
      isLuxury: prod.isLuxury,
    }));
  }

  async getSingleCarModel(carModelId: string) {
    const carModel = await this.findCarModel(carModelId);
    return {
      id: carModel.id,
      name: carModel.name,
      make: carModel.make,
      year: carModel.year,
      isLuxury: carModel.isLuxury,
    };
  }

  async updateCarModel({
    id,
    name,
    make,
    year,
    isLuxury,
  }: {
    id: string;
    name?: string;
    make?: string;
    year?: number;
    isLuxury?: boolean;
  }) {
    const updatedCarModel = await this.findCarModel(id);
    if (name) {
      updatedCarModel.name = name;
    }
    if (make) {
      updatedCarModel.make = make;
    }
    if (year) {
      updatedCarModel.year = year;
    }
    if (isLuxury) {
      updatedCarModel.isLuxury = isLuxury;
    }
    updatedCarModel.save();
  }

  async deleteCarModel(carModelId: string) {
    const result = await this.carModelModel.deleteOne({ _id: carModelId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find the car model.');
    }
  }

  private async findCarModel(id: string): Promise<CarModel> {
    let carModel;
    try {
      carModel = await this.carModelModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find car model.');
    }
    if (!carModel) {
      throw new NotFoundException('Could not find car model.');
    }
    return carModel;
  }
}
