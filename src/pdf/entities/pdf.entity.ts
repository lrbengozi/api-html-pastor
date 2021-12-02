import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PdfDocument = Pdf & Document;

@Schema()
export class Pdf {
  @Prop({ required: true })
  protocol: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  bufferHmll: Buffer;

  @Prop()
  bufferPdf: Buffer;
}

export const PdfSchema = SchemaFactory.createForClass(Pdf);
