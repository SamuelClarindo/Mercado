import { Fornecedor } from '../../fornecedores/entities/fornecedor.entity';
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  // ===== CAMPO ADICIONADO =====
  // Esta propriedade mapeia a nova coluna 'codigo' que criamos no banco.
  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  codigo: string;
  // ============================

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ name: 'unidade_medida', type: 'varchar', length: 10, nullable: false })
  unidade_medida: string;
  
  // Relacionamento: Muitos produtos podem pertencer a UM fornecedor principal.
  @ManyToOne(() => Fornecedor, { eager: false }) // eager: false para não carregar sempre por padrão
  @JoinColumn({ name: 'fornecedor_id' }) // Especifica a coluna da chave estrangeira
  fornecedor: Fornecedor;

  @CreateDateColumn({ name: 'data_criacao' })
  data_criacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  data_atualizacao: Date;
}