import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Car } from './car.model';

@Injectable()
export class CarsService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  async addCar(
    name: string,
    nr_of_models: number,
    average_horsepower: number,
    average_price?: number,
  ) {
    /* -- EXERCISE 1 -- */
    const existingRecord = await this.carModel.findOne({
      name: new RegExp(name, 'i'),
    });

    if (existingRecord) {
      throw new ConflictException('Car name already exists');
    }
    /* -------------- */

    const newCar = new this.carModel({
      name,
      nr_of_models,
      average_horsepower,
      average_price,
    });

    const result = await newCar.save();

    return { id: result.id };
  }

  async getCars() {
    const cars = await this.carModel.find();
    return cars.map((car) => ({
      id: car.id,
      name: car.name,
      nr_of_models: car.nr_of_models,
      average_horsepower: car.average_horsepower,
      average_price: car.average_price,
    }));
  }

  async getSingleCar(carId: string) {
    const car = await this.findCar(carId);
    if (car)
      return {
        id: car.id,
        name: car.name,
        nr_of_models: car.nr_of_models,
        average_horsepower: car.average_horsepower,
        average_price: car.average_price,
      };

    return new NotFoundException('Could not find car');
  }

  async updateCar({
    id,
    name,
    nr_of_models,
    average_horsepower,
    average_price,
    current_models,
  }: {
    id: string;
    name?: string;
    nr_of_models?: number;
    average_horsepower?: number;
    average_price?: number;
    current_models?: number;
  }) {
    const updatedCar = await this.findCar(id);
    if (name) {
      updatedCar.name = name;
    }
    if (nr_of_models) {
      updatedCar.nr_of_models = nr_of_models;
    }
    if (average_horsepower) {
      updatedCar.average_horsepower = average_horsepower;
    }
    if (average_price) {
      updatedCar.average_price = average_price;
    }
    if (current_models) {
      updatedCar.current_models = current_models;
    }

    updatedCar.save();
  }

  async deleteCar(carId: string) {
    const result = await this.carModel.deleteOne({ _id: carId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find car.');
    }
  }

  private async findCar(id: string): Promise<Car> {
    let car;
    try {
      car = await this.carModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find car by id.');
    }
    if (!car) {
      throw new NotFoundException('Could not find car by id.');
    }
    return car;
  }

  async findCarByName(name: string) {
    return await this.carModel.findOne({ name: new RegExp(name, 'i') });
  }
}
