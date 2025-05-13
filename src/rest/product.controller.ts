import { ProductDTO } from "src/types/product.dto";
import {Body, Controller, Get, Param, Post, Put, Req} from "@nestjs/common";
import { ProductService } from "src/modules/purchaseorder/product.service";
import { Request } from 'express';

@Controller('/products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Post()
    createProduct(
        @Req() req: Request,
        @Body() body: ProductDTO) {
        return this.productService.saveProduct(body);
    }

    @Get()
    getProducts(
        @Req() req: Request) {
        return this.productService.getProducts();
    }

    @Get("/:id")
    getProduct(
        @Param('id') id: string) {
        return this.productService.getProduct(id);
    }
}