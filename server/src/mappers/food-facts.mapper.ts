import { FoodFactsResponseDto } from '@/foodFacts/dto/food-facts.dto';

/**
 *  I don't want to send all the fields to the client
 *  The original schema with the fields send from the food facts api can be found here: https://openfoodfacts.github.io/openfoodfacts-server/api/ref-v3/#get-/api/v3/product/-barcode
 */
export class FoodFactsMapper {
  static toResponseDto(data: any): FoodFactsResponseDto {
    const responseDto = new FoodFactsResponseDto();
    responseDto.abbreviated_product_name = data.abbreviated_product_name;
    responseDto.allergens = data.allergens;
    responseDto.brands = data.brands;
    responseDto.code = data.code;
    return responseDto;
  }
}
