import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private product: Repository<Product>) {}

  create(createProductDto: CreateProductDto) {
    return this.product.create(createProductDto);
  }

  findAll() {
    return this.product.find();
  }

  findOne(id: number) {
    return this.product.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.product.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.product.delete(id);
  }
}
