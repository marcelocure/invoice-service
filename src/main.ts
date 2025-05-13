import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { connect } from 'mongoose';
import { config } from './config';
const logger: Logger = new Logger("Main");

async function bootstrap() {
  await connectToMongodb();
  
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  //app.useGlobalFilters(new CustomErrorFilter())
  app.enableCors();
  await app.listen(3002);
}

async function connectToMongodb() {
  const {username, password, host, port, dbName } = config.mongodb;
  const uri = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
  logger.log(`Connecting to MongoDB ${uri}`);
  try {
    await connect(uri, {});
    logger.log("Successfuly connected to MongoDB");
  } catch (err) {
    logger.log("Error connecting to MongoDB: " + err);
  }
}
bootstrap();