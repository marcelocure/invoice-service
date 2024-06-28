import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import CustomErrorFilter from './common/filter/CustomErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  //app.useGlobalFilters(new CustomErrorFilter())
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
