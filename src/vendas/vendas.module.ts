// Conteúdo para: src/vendas/vendas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venda])],
  exports: [TypeOrmModule], // Exporta o repositório para ser usado em outros módulos
})
export class VendasModule {}