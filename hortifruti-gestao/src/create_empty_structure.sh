#!/bin/bash

# --- Limpa os arquivos padrão da pasta src ---
echo "Limpando diretório src..."
rm -f App.css App.test.tsx logo.svg reportWebVitals.ts setupTests.ts App.tsx index.css

# --- Cria a estrutura de diretórios ---
echo "Criando estrutura de diretórios..."
mkdir -p assets
mkdir -p components/common
mkdir -p components/layout
mkdir -p components/dashboard
mkdir -p components/shared
mkdir -p context
mkdir -p hooks
mkdir -p pages/compras
mkdir -p pages/despesas
mkdir -p pages/fornecedores
mkdir -p pages/importacao
mkdir -p pages/produtos
mkdir -p pages/relatorios
mkdir -p services
mkdir -p theme
mkdir -p types
mkdir -p utils

# --- Cria os arquivos vazios ---
echo "Criando arquivos vazios..."

# Arquivos na raiz do src
touch index.tsx App.tsx index.css

# Assets
touch assets/logo.svg

# Componentes
touch components/common/ConfirmationModal.tsx
touch components/common/LoadingSpinner.tsx
touch components/common/PageTitle.tsx
touch components/common/ResponsiveCard.tsx
touch components/layout/Appbar.tsx
touch components/layout/Main.tsx
touch components/layout/Sidebar.tsx
touch components/layout/menuItems.ts
touch components/dashboard/DashboardCard.tsx
touch components/dashboard/FaturamentoChart.tsx
touch components/dashboard/TopDespesasChart.tsx
touch components/dashboard/TopProdutosChart.tsx
touch components/shared/DraggableUploader.tsx

# Context e Hooks
touch context/NotificationContext.tsx
touch hooks/useNotifications.ts

# Páginas
touch pages/Dashboard.tsx
touch pages/compras/Compras.tsx
touch pages/compras/LancarCompra.tsx
touch pages/despesas/Despesas.tsx
touch pages/despesas/DespesaForm.tsx
touch pages/fornecedores/Fornecedores.tsx
touch pages/fornecedores/FornecedorForm.tsx
touch pages/importacao/ImportarVendas.tsx
touch pages/produtos/Produtos.tsx
touch pages/produtos/ProdutoForm.tsx
touch pages/relatorios/RelatorioCompras.tsx
touch pages/relatorios/RelatorioVendas.tsx

# Serviços (API)
touch services/api.ts
touch services/comprasService.ts
touch services/despesasService.ts
touch services/fornecedoresService.ts
touch services/importacaoService.ts
touch services/produtosService.ts
touch services/relatoriosService.ts

# Tema
touch theme/theme.ts

# Tipos
touch types/index.ts

# Utilitários
touch utils/formatCurrency.ts
touch utils/formatDate.ts

echo ""
echo "Estrutura de pastas e arquivos vazios criada com sucesso!"