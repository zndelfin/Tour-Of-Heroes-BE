import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CharactersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'l0c4lp4ss',
      database: 'heroesdb',
      autoLoadEntities: true,
      synchronize: true
    })
  ]
})
export class AppModule {}
