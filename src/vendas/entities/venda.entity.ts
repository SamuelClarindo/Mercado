// Conteúdo para o novo arquivo: src/vendas/entities/venda.entity.ts

import { HistoricoImportacao } from '../../importacao/entities/historico-importacao.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vendas')
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produto, { onDelete: 'RESTRICT', nullable: false })
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @ManyToOne(() => HistoricoImportacao, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'historico_importacao_id' })
  historico_importacao: HistoricoImportacao;

  @Column({ name: 'quantidade_vendida', type: 'numeric', precision: 10, scale: 3 })
  quantidade_vendida: number;

  @Column({ name: 'preco_venda_unitario', type: 'numeric', precision: 10, scale: 2 })
  preco_venda_unitario: number;
  
  @Column({ name: 'custo_unitario', type: 'numeric', precision: 10, scale: 2 })
  custo_unitario: number;

  @CreateDateColumn({ name: 'data_venda' })
  data_venda: Date;
}