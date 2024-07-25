import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateSubscriptionDto {
  @IsNumber()
  @IsNotEmpty()
  planId: number;

  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;

  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @IsString()
  @IsNotEmpty()
  paymentGateway: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
}
