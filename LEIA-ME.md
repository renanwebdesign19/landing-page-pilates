# Eixo Pilates — arquivos recuperados do site publicado

Origem: https://eixo-pilates-studio.supportivegnome1.chatgpt.site/

## Abrir no VS Code

1. Extraia o ZIP e abra a pasta `Eixo-Pilates` no VS Code.
2. Abra `index.html` com a extensão Live Server ou execute na raiz da pasta:

   ```sh
   python -m http.server 5173
   ```

   Em sistemas onde o comando se chama `python3`, use `python3 -m http.server 5173`.
3. No navegador, acesse o servidor local na porta 5173. Não é necessário Node.js,
   npm, instalação de dependências ou um processo de build.

## Pastas

- `index.html`: conteúdo e estrutura da página.
- `css/styles.css`: estilos e regras responsivas.
- `js/app.js`: interações do menu, contagem, perguntas, depoimentos e formulário.
- `assets/imagens/`: 33 imagens, incluindo ícones SVG e imagens PNG.
- `assets/fontes/`: fonte Google Sans Flex em TTF.
- `assets/videos/`: vídeo de fundo `hero.mp4`.
- `original-publicado/`: cópias exatas dos três arquivos de código baixados.
- `inventario.json`: URLs, caminhos, tamanhos e hashes para conferência.

Os caminhos dos arquivos foram ajustados na versão organizada para manter o site
funcionando com as novas pastas. A lógica, os textos e os estilos foram preservados.
As cópias em `original-publicado` são para comparação; o ponto de entrada para
executar o projeto é o `index.html` na raiz.

## O que esta recuperação inclui

Foram recuperados os três arquivos de código publicados (HTML, CSS e JavaScript)
e todos os 35 arquivos de mídia referenciados por eles, inclusive referências no
JavaScript. Todos os recursos visuais e a fonte são locais. O link para o Instagram
continua sendo um link externo.

Esta é uma recuperação da versão pública, não uma exportação interna do editor
Sites. Não há acesso garantido a histórico, arquivos de edição, arquivos não
referenciados ou serviços internos. O servidor retorna a página principal em vez
de uma listagem de arquivos. O material publicado não referencia código de servidor
nem módulos adicionais.

## Comportamentos que já existem no site original

- O formulário de agendamento é uma demonstração local. Não envia dados, não
  confirma reservas reais e não possui integração com WhatsApp ou agenda.
- A contagem regressiva é ilustrativa e reinicia ao carregar a página.
- Os quatro depoimentos têm imagens, mas seus vídeos estão definidos como `null`
  no código original. Portanto, esses quatro vídeos não estão no pacote; o diálogo
  original mostra o aviso de que o vídeo ainda não foi adicionado.
- O vídeo de fundo da abertura está incluído integralmente.

Não foram inventados vídeos, integrações ou arquivos de código ausentes.
