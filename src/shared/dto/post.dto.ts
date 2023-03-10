import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class postDto {
  poster: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  posterTitle: string;
}
