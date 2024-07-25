import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class AddUploadDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsObject()
  @IsNotEmpty()
  metaData: object;
}
