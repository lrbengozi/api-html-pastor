import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Inject,
} from '@nestjs/common';
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
    // this.client.emit('pdf', response.protocol);
    return {
      _id,
      status,
      protocol,
    };
  }

  @Get(':protocol')
  findOne(@Param('protocol') protocol: string) {
    return this.pdfService.findOne(protocol);
  }
}
