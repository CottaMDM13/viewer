# Vitrine de Projetos - Telemetria (Tailwind)

Projeto Next.js independente para exibir, em modo somente leitura, os projetos
cadastrados no seu sistema de Telemetria, usando TailwindCSS e ícones do lucide-react.

## Passos

1. Copie o arquivo `.env.example` para `.env` e preencha a variável:

```bash
cp .env.example .env
```

Edite `.env`:

```env
DATABASE_URL="sua_connection_string_do_neon"
```

2. Instale as dependências:

```bash
npm install
```

3. Gere o client do Prisma:

```bash
npx prisma generate
```

4. Rode em desenvolvimento:

```bash
npm run dev
```

5. Acesse: http://localhost:3000

O site vai ler diretamente a tabela `Project` do seu banco Neon e exibir os projetos com um visual moderno.
