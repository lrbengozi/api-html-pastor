import { Readable } from 'stream';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { Pdf, PdfDocument } from './entities/pdf.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class PdfService {
  constructor(@InjectModel(Pdf.name) private pdfModel: Model<PdfDocument>) {}

  create(file: CreatePdfDto) {
    const newPdf = new this.pdfModel({
      status: 'PROCESSANDO',
      bufferHmll: file.buffer,
      protocol: randomBytes(8).toString('hex'),
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newPdf.save();
  }

  async findOne(protocol: string) {
    const { _id, bufferPdf, status } = await this.pdfModel
      .findOne({ protocol })
      .exec();
    return {
      _id,
      status,
      protocol,
      bufferPdf,
    };
  }

  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
