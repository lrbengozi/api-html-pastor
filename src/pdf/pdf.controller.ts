import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Inject,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    @Inject('PDF_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: CreatePdfDto) {
    const { status, _id, protocol } = await this.pdfService.create(file);
    this.client.emit('pdf', protocol);
    return {
      _id,
      status,
      protocol,
    };
  }

  @Get(':protocol')
  async findOne(@Param('protocol') protocol: string, @Res() res: Response) {
    const response = await this.pdfService.findOne(protocol);
    if (response && response.status === 'PROCESSADO') {
      const buffer = response.bufferPdf;
      const stream = this.pdfService.getReadableStream(buffer);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': buffer.length,
      });

      stream.pipe(res);
    } else {
      return response;
    }
  }
}
