import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jimmy:jimmy222000@ecommerce-nest.smou5yw.mongodb.net/?appName=Ecommerce-NEST',
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
