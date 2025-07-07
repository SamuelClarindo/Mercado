import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ProdutoExtraidoDto } from './dto/produto-extraido.dto';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class ImportacaoService {
  private readonly logger = new Logger(ImportacaoService.name);

  async processarArquivoVendas(file: Express.Multer.File): Promise<ProdutoExtraidoDto[]> {
    this.logger.log(`Iniciando leitura do PDF em: ${file.path}`);

    try {
      const buffer = fs.readFileSync(file.path);
      const data = await pdfParse(buffer);
      const texto = data.text;

      console.log('------ CONTEÚDO DO PDF EXTRAÍDO ------');
      console.log(texto);
      console.log('--------------------------------------');

      const linhas = texto.split('\n');
      const produtosExtraidos: ProdutoExtraidoDto[] = [];

      for (const linha of linhas) {
        const linhaLimpa = linha.trim();
        
        // Pular linhas vazias e cabeçalhos/rodapés conhecidos
        if (!linhaLimpa || linhaLimpa.length < 10 || !/^\d/.test(linhaLimpa) ||
            !/[a-zA-Z]/.test(linhaLimpa) ||
            linhaLimpa.includes('Nome da Empresa') || 
            linhaLimpa.includes('Endereço:') ||
            // ... (manter as outras verificações de cabeçalho)
            linhaLimpa.includes('Lucro No Periodo')) {
          continue;
        }

        // A Regex Universal resolve a ambiguidade ao ancorar a busca no final da linha ($)
        const regexUniversal = /^(\d+)(.+?)(\d{1,3}(?:\.\d{3})*,\d{2})(\d{1,3}(?:\.\d{3})*,\d{2})(\d{1,3}(?:\.\d{3})*,\d{2})(\d{1,3}(?:\.\d{3})*,\d{2})(-?\d{1,3}(?:\.\d{3})*,\d{2})$/;
        const match = linhaLimpa.match(regexUniversal);

        if (match) {
            const [, codigo, descricao, qtdStr, custoStr, custoRealStr, vendaStr, markupStr] = match;
            
            const quantidade = this.parseNumero(qtdStr);
            const custo = this.parseNumero(custoStr);
            const custoReal = this.parseNumero(custoRealStr);
            const venda = this.parseNumero(vendaStr);
            const markup = this.parseNumero(markupStr);
            const descricaoLimpa = descricao.trim().replace(/\s+/g, ' ');

            if (!isNaN(quantidade) && !isNaN(venda)) {
                produtosExtraidos.push({
                    codigo: codigo.trim(),
                    descricao: descricaoLimpa,
                    quantidade_vendida: quantidade,
                    custo: custo,
                    custo_real: custoReal,
                    venda: venda,
                    markup: markup
                });
                console.log(`✓ Produto extraído: ${codigo} - ${descricaoLimpa}`);
            }
        } else {
            if (linhaLimpa.match(/^\d+[A-Z]/)) {
                console.log(`❌ Linha não capturada: ${linhaLimpa}`);
            }
        }
      }

      this.logger.log(`${produtosExtraidos.length} produtos extraídos com sucesso.`);
      return produtosExtraidos;

    } catch (error) {
      this.logger.error('Erro ao ler ou extrair dados do PDF:', error);
      throw new InternalServerErrorException('Erro ao processar arquivo PDF');
    } finally {
      this.logger.log(`Removendo arquivo temporário: ${file.path}`);
      fs.unlinkSync(file.path);
    }
  }

  private parseNumero(valorString: string): number {
    if (!valorString) return NaN;
    return parseFloat(valorString.replace(/\./g, '').replace(',', '.'));
  }
}