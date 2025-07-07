// Conteúdo completo e refatorado para: src/importacao/importacao.controller.ts

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ImportacaoService } from './importacao.service';
import { HistoricoImportacao } from './entities/historico-importacao.entity';

@Controller('importacao')
export class ImportacaoController {
    constructor(private readonly importacaoService: ImportacaoService) {}

    @Post('vendas')
    @UseInterceptors(FileInterceptor('relatorio', { storage: memoryStorage() }))
    async uploadRelatorioVendas(@UploadedFile() file: Express.Multer.File): Promise<HistoricoImportacao> {
        // A chamada agora executa todo o processo de uma vez e retorna o histórico finalizado.
        return this.importacaoService.processarArquivoVendas(file);
    }
}