import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GraphQLModule } from '@nestjs/graphql';

import Zip from './entities/zip/zip.entity';

import AppResolver from './app.resolver';
import AppService from './app.service';
@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'mongo',
      entities: [Zip],
      dbName: 'pagination',
      debug: true,
      clientUrl: 'mongodb://root:password@localhost:27017',
    }),
    MikroOrmModule.forFeature({
      entities: [Zip],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: './schema.gql',
      playground: true,
    }),
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
