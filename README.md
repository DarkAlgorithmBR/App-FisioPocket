# 🩺 FisioPocket: O App de Bolso do Acadêmico de Fisioterapia

> **Web App / PWA Mobile-First**, ultrarrápido e concebido para a rotina prática de estágio hospitalar, ambulatorial e rounds clínicos.

---

## 📱 Principais Funcionalidades

### 1. Acervo Central de Mapas Mentais (Capacidade para 150+ Mapas)
- **Estrutura Rigorosa por Categorias e Subpastas**:
  - **Ortopedia & Traumatologia**: Membro Superior, Membro Inferior, Coluna & Pelve, Recursos Terapêuticos.
  - **Fisioterapia Neurofuncional**: SNC, SNP, Equilíbrio & Marcha, Escalas Neurológicas.
  - **Fisioterapia Respiratória & UTI**: Semiologia Pulmonar, Patologias Respiratórias, Recursos & Manobras, Ventilação Mecânica.
  - **Cardiorrespiratória & Fisiologia**: Reabilitação Cardíaca, Testes Funcionais, Prescrição de Exercício.
  - **Anatomia & Cinesiologia**: Palpação, Biomecânica, Goniometria, Dermátomos & Miótomos.
  - **Pediatria & Saúde da Mulher**: Marcos Motores, Neonato, Urogineco, Puerpério.
  - **Prática Clínica & Round**: SOAP, Red Flags, Condutas Rápidas.
- **Barra de Busca Instantânea**: Pesquisa em tempo real por termos como "LCA", "Glasgow", "ausculta", "manguito", tags ou categorias.
- **Carrossel Horizontal de Filtros & Filtro de Favoritos**: Troca de especialidades em 1 toque.
- **Visualizador em Alta Resolução (Full Screen)**:
  - Controles flutuantes de Pinch-to-Zoom (zoom in, zoom out, reset 100%).
  - Pan & arrasto com o dedo/mouse pela imagem do mapa mental.
  - Botão de **Baixar / Abrir Arquivo Original**.
  - Aba de **Pulos do Gato no Estágio** com dicas essenciais para round clínico.
  - Botão para **Fixar nos Favoritos**.
- **Painel Administrativo (`/admin/upload`)**:
  - Interface para o administrador indexar os mapas mentais com título, especialidade, subcategoria, tags de busca, estimativa de leitura e upload de arquivo (imagem/PDF) ou URL pública (CDN, Supabase, Cloudinary).

---

### 2. Buscador de Testes Especiais de Bolso (Semiologia)
- **Filtros por Articulação**: Ombro, Joelho, Coluna, Quadril, Tornozelo, Cotovelo, Punho.
- Cards expansíveis com:
  - **Objetivo do Teste**
  - **Posicionamento do Paciente e do Terapeuta**
  - **Execução da Manobra**
  - **Critério de Teste Positivo** com **badge vermelha de destaque**
  - Sensibilidade, especificidade e dicas práticas.

---

### 3. Gerador de Evolução Diária (SOAP)
- **Formulário progressivo em 4 passos**:
  - **S (Subjetivo)**: Seleção rápida de queixas em 1 toque (lúcido, dispneia, dor, cansaço).
  - **O (Objetivo)**: Registro de sinais vitais (PA, FC, FR, SpO2, Temp, Dor EVA) + achados auscultatórios + condutas motoras/respiratórias executadas.
  - **A (Avaliação)**: Resposta terapêutica e tolerância ao esforço.
  - **P (Plano)**: Metas da sessão e condutas futuras.
- **Compilador Hospitalar Automático**: Gera o texto no padrão formal exigido por hospitais e prontuários eletrônicos.
- **Botão de 1 Toque: "Copiar para o Prontuário"** com feedback tátil e sonoro visual.
- **Histórico Completo**: Todas as evoluções ficam salvas no `localStorage`.

---

### 4. Calculadoras & Escalas Rápidas
1. **Escala de Glasgow Estendida com Reatividade Pupilar (GCS-P)**:
   - Abertura Ocular (1-4)
   - Resposta Verbal (1-5)
   - Resposta Motora (1-6)
   - Reatividade Pupilar (0 a -2)
   - Cálculo automático de pontuação, gravidade do TCE e **alerta de Intubação Orotraqueal (IOT) quando $\le 8$**.
2. **Escala Visual Analógica (EVA)**:
   - Slider de dor contínuo de 0 a 10 com indicadores visuais de faces e conduta cinesioterapêutica recomendada.
3. **Escala MRC de Força Muscular & FRAU / ICU-AW**:
   - Graus de 0 a 5 com descrições objetivas.
   - Calculadora dos 6 pares musculares (ombro, cotovelo, punho, quadril, joelho, tornozelo) com ponto de corte de 48/60 para fraqueza adquirida na UTI.
4. **Calculadora de Gasometria Arterial**:
   - pH, PaCO2, HCO3 e PaO2.
   - Interpretação instantânea de acidose/alcalose respiratória/metabólica, compensada ou descompensada, distúrbios mistos e oxigenação.

---

### 5. Rastreador de Horas de Estágio (Plantão)
- Barra de progresso visual de horas concluídas vs. meta obrigatória da faculdade (padrão 400h, customizável).
- Histórico completo de plantões com data, local, setor (UTI, Enfermaria, Ambulatório), preceptor e resumo de casos atendidos.
- Distribuição de horas cumpridas por setor e efeito de celebração ao bater metas.

---

## ⚡ Como Executar em 1 Clique (Executável / Standalone)

Você tem **3 formas simples** de rodar o FisioPocket:

### 1. Duplo Clique Direto (Sem precisar de terminal ou Node.js!)
- Dê 2 cliques no arquivo **[`iniciar.bat`](file:///c:/Users/delgi/Documents/entregavel-fisio-pocket/iniciar.bat)** ou **[`FisioPocket_App.html`](file:///c:/Users/delgi/Documents/entregavel-fisio-pocket/FisioPocket_App.html)**.
- O Web App abrirá imediatamente no seu navegador padrão com todos os recursos, estilos, mapas e dados funcionando offline.

### 2. Menu Executável ([`executar.bat`](file:///c:/Users/delgi/Documents/entregavel-fisio-pocket/executar.bat))
- Dê 2 cliques em **`executar.bat`** para escolher entre:
  1. Abrir o Web App Standalone instantâneo.
  2. Iniciar o servidor local de desenvolvimento (Vite).
  3. Iniciar o servidor de produção local.

### 3. Pelo Terminal (Desenvolvimento)
```bash
# Iniciar servidor local
npm run dev

# Gerar novo arquivo executável / dist
npm run build
```

---

## 🛠️ Stack Tecnológica
- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS** com sistema de cores Slate-50, Emerald-600 e Teal-600
- **Lucide React** (Ícones clínicos e de navegação)
- **Canvas-Confetti** (Feedback lúdico de metas)
- **Service Worker & Web Manifest** (PWA instalável e offline-ready)
