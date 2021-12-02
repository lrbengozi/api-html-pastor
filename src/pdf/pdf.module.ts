import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Pdf, PdfSchema } from './entities/pdf.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pdf.name, schema: PdfSchema }]),
    ClientsModule.register([
      {
        name: 'PDF_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'pdf_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
