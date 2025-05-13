import {Injectable, NotFoundException} from '@nestjs/common';
import { ProductDTO } from '../../types/product.dto';
import { ProductModel } from '../../models/product.model';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  public async saveProduct(product : ProductDTO): Promise<void> {
    this.logger.log(`Processing Product ${JSON.stringify(product)}`)
    const poModel = new ProductModel({
      id: uuidv4(),
      description: product.description,
      category: product.category,
      unitPrice: product.unitPrice
    })
    await poModel.save();
    this.logger.log(`Product saved ${JSON.stringify(product)}`)
  }

  public async getProducts(): Promise<ProductDTO[]> {
    const products = await ProductModel.find();
    return products.map(product => new ProductDTO(product.id, product.category, product.description, product.unitPrice ));
  }

  public async getProduct(id:string): Promise<ProductDTO> {
    const product = await ProductModel.findOne({id: id});
    if (product == null) {
      throw new NotFoundException();
    }
    return new ProductDTO(product.id, product.category, product.description, product.unitPrice );
  }
}
