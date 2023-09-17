import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configs/configuration';
import databaseConfig from './configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [configuration, databaseConfig],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'ecommerce',
      connectionFactory: (connection) => {
        connection.plugin(mongooseAutoPopulate);
        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
