import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { ProdutosModule } from './produtos/produtos.module';
import { DespesasModule } from './despesas/despesas.module';
import { ComprasModule } from './compras/compras.module';
import { ImportacaoModule } from './importacao/importacao.module'; // <-- ADICIONADO
import { Fornecedor } from './fornecedores/entities/fornecedor.entity';
import { Produto } from './produtos/entities/produto.entity';
import { Despesa } from './despesas/entities/despesa.entity';
import { Compra } from './compras/entities/compra.entity';
import { ItemCompra } from './compras/entities/item-compra.entity';
import { HistoricoImportacao } from './importacao/entities/historico-importacao.entity'; // <-- ADICIONADO

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234', // Verifique sua senha
      database: 'hortifruti_db',
      entities: [Fornecedor, Produto, Despesa, Compra, ItemCompra, HistoricoImportacao], // <-- ADICIONADO
      synchronize: true,
    }),
    FornecedoresModule,
    ProdutosModule,
    DespesasModule,
    ComprasModule,
    ImportacaoModule, // <-- ADICIONADO
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}