import { FoodFactsMapper } from '@/mappers/food-facts.mapper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FoodFactsService {
  constructor(private configService: ConfigService) {}

  getFoodFactsEndpoint(): string {
    const endpoint = this.configService.get<string>('FOODFACTS_ENDPOINT')!;
    if (endpoint === undefined) {
      throw new Error('FOODFACTS_ENDPOINT not configured');
    }
    return endpoint;
  }
  async getFact(barcode: string) {
    const endPoint = this.getFoodFactsEndpoint();
    const result = await fetch(`${endPoint}/api/v3/product/${barcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Andres-Portfolio/1.2 (andresboulanger94@gmail.com)',
      },
    });
    const data = await result.json();
    if (!result.ok) {
      throw new Error(data.message);
    }
    const response = FoodFactsMapper.toResponseDto(data.product);

    return response;
  }
}
