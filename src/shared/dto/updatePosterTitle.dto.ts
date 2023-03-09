import { IsNotEmpty, IsString } from "class-validator";



export class updatePosterTitleDto {

    @IsNotEmpty()
    @IsString()
    posterTitle: string
}