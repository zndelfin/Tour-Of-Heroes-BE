import { Injectable, HttpException } from "@nestjs/common";
import { CharactersRepository } from "./characters.repository"

@Injectable()
export class CharactersService {
    constructor(private charactersRepo: CharactersRepository) {   }

    findOne(id: string){
        return this.charactersRepo.findOne(id);
    }

    findAll() {
        return this.charactersRepo.findAll();
    }

    createCharacter(character : any) {
        return this.charactersRepo.createCharacter(character);
    }


    // remove(characterID): Promise<any> {
    //     let id = Number(characterID);
    //     return new Promise(resolve => {
    //         let index = this.characters.findIndex(character => character.id === id);
    //         if (index === -1) {
    //             throw new HttpException("character does not exist", 404);
    //         }
    //         this.characters.splice(1, index);
    //         resolve(this.characters);
    //     })
    // }

}
