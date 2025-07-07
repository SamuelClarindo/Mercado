// Conteúdo atualizado para: src/importacao/entities/historico-importacao.entity.ts

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusImportacao {
    PENDENTE = 'PENDENTE',
    CONCLUIDA = 'CONCLUIDA',
    ERRO = 'ERRO',
}

@Entity('historico_importacao')
export class HistoricoImportacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome_arquivo_origem', length: 255, nullable: false })
  nome_arquivo_origem: string;

  // ===== CAMPO ADICIONADO =====
  @Column({ name: 'faturamento_total', type: 'numeric', precision: 10, scale: 2, nullable: true })
  faturamento_total: number;
  // ============================

  @CreateDateColumn({ name: 'data_importacao' })
  data_importacao: Date;

  @Column({
      type: 'enum',
      enum: StatusImportacao,
      default: StatusImportacao.PENDENTE,
  })
  status: StatusImportacao;
}