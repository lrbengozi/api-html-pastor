import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [PdfModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
