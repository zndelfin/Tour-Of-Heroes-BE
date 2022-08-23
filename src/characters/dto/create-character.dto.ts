import { IsString } from "class-validator";

export class CreateCharacterDTO {
    @IsString()
    id: string;

    @IsString()
    name: string;
    
    @IsString()
    description: string;
}