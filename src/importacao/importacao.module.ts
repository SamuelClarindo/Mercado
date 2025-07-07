import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportacaoController } from './importacao.controller';
import { ImportacaoService } from './importacao.service';
import { HistoricoImportacao } from './entities/historico-importacao.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoricoImportacao]),
    // Configuração do Multer para armazenar arquivos em memória
    MulterModule.register({
        dest: './upload', // Esta pasta é temporária, vamos usar o buffer em memória
    }),
  ],
  controllers: [ImportacaoController],
  providers: [ImportacaoService],
})
export class ImportacaoModule {}