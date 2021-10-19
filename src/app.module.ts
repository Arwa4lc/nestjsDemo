import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://Arwaabdelrahem:eCiF4If7TvGHgg2M@cluster0.xse5n.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
