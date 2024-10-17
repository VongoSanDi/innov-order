import { FrontendProductData } from "./domain";

export interface VerticalTableProps {
  data: FrontendProductData[];
  onRemoveProduct: (index: number) => void;
}
