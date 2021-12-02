import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PdfModule } from './pdf/pdf.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), PdfModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
