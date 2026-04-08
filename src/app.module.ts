import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';

@Module({

  imports: [


    TypeOrmModule.forRoot({

      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'JOAO@123',
      database: 'loja',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    CategoriaModule,
    ProdutoModule,
  ],


})
export class AppModule { }