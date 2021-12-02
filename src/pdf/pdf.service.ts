import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfService {
  create(file) {
    console.log(typeof file);
    console.log(file);
    return 'This action adds a new pdf';
  }

  findOne(id: number) {
    return `This action returns a #${id} pdf`;
  }
}
