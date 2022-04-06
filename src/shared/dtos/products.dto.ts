interface ProductBaseDto {
  name: string;
  category: string;
  description?: string;
}

export default interface ProductResponseDto extends ProductBaseDto {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Turn it in an interface when we need to add an additional field
export type ProductRequestDto = ProductBaseDto;