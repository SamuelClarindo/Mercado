import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn 
} from 'typeorm';

// Usaremos o nome da tabela 'vendas_consolidadas' que foi criada no script SQL inicial.
// A entidade pode ter um nome mais programático como 'HistoricoImportacao'.
@Entity('vendas_consolidadas')
export class HistoricoImportacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'data_referencia', type: 'date', unique: true })
  data_referencia: Date;

  @Column({ name: 'faturamento_total', type: 'numeric', precision: 10, scale: 2 })
  faturamento_total: number;
  
  @Column({ name: 'nome_arquivo_origem', length: 255, nullable: true })
  nome_arquivo_origem: string;

  @Column({ name: 'hash_arquivo', length: 64, unique: true, nullable: true })
  hash_arquivo: string;

  @CreateDateColumn({ name: 'data_importacao' })
  data_importacao: Date;
}