import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FoodFactsService } from './foodFacts.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Controller('food-facts')
export class FoodFactsController {
  constructor(private readonly foodFactsService: FoodFactsService) {}

  @Get(':barcode')
  @UseGuards(JwtAuthGuard)
  async getFoodFacts(@Param('barcode') barcode: string) {
    return this.foodFactsService.getFact(barcode);
  }
}
