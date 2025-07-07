import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportacaoService } from './importacao.service';

@Controller('importacao')
export class ImportacaoController {
    constructor(private readonly importacaoService: ImportacaoService) {}

    @Post('vendas')
    @UseInterceptors(FileInterceptor('relatorio')) // 'relatorio' é o nome do campo no form-data
    uploadRelatorioVendas(@UploadedFile() file: Express.Multer.File) {
        return this.importacaoService.processarArquivoVendas(file);
    }
}