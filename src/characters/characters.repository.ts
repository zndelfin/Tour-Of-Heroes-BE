import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class CharactersRepository {

    async findOne(id: string) {
        const contents = await readFile("characters.json", "utf8");
        const characters = JSON.parse(contents);

        return characters[id];
    }

    async findAll() {
        const contents = await readFile("characters.json", "utf8");
        const characters = JSON.parse(contents);

        return characters;
    }

    async createCharacter(character : any) {
        const contents = await readFile("characters.json", "utf8");
        const characters = JSON.parse(contents);

        const id = Math.floor(Math.random() * 999);
        characters[id] = { id, name : character.name, description: character.description }

        await writeFile("characters.json", JSON.stringify(characters));
        // const {name, description} = createCharacterDTO;
        // const character = new Character();
        // character.name = name;
        // character.description = description;
        // await character.save();
        // return character;
    }
}
