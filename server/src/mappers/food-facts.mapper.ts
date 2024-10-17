import { FoodFactsResponseDto } from '@/foodFacts/dto/food-facts.dto';

export class FoodFactsMapper {
  static toResponseDto(data: any): FoodFactsResponseDto {
    console.log('mapper', data);

    const responseDto = new FoodFactsResponseDto();
    responseDto.abbreviated_product_name = data.abbreviated_product_name;
    responseDto.allergens = data.allergens;
    responseDto.brands = data.brands;
    responseDto.code = data.code;
    return responseDto;
  }
}
