
# Portfólio - Sthefany Evangelista Matias

Repositório do código-fonte do portfólio pessoal, desenvolvido do zero com HTML, CSS e JavaScript puros. O projeto centraliza os trabalhos desenvolvidos ao longo da minha trajetória técnica, com foco em clareza de apresentação, performance e boas práticas de desenvolvimento frontend.

<br>

## Visão Geral do Projeto

O portfólio foi construído sem frameworks ou bibliotecas externas. Toda a lógica de interatividade, manipulação de DOM, sistema de busca e alternância de temas foi implementada em Vanilla JavaScript, priorizando leveza e controle sobre o comportamento da aplicação.

<br>

## Funcionalidades

- **Dark/Light Mode** — alternância dinâmica de temas com persistência via `localStorage`
- **Sistema de Busca** — busca em tempo real por seções e projetos com sugestões dinâmicas
- **Glassmorphism** — interface com efeitos de desfoque (`backdrop-filter`) e camadas translúcidas
- **Responsive Design** — layout adaptado para mobile, tablet e desktop
- **Menu Mobile** — navegação com controle de acessibilidade via `aria-expanded` e `aria-label`
- **Acessibilidade** — semântica HTML5 e práticas compatíveis com leitores de tela

<br>

## Decisões Técnicas

A implementação do sistema de busca em tempo real exigiu atenção especial à performance. A solução adotada combina filtragem sobre estrutura de dados estática com manipulação eficiente do DOM, evitando reflows desnecessários. A gestão de temas foi centralizada em variáveis CSS, garantindo que a alternância Light/Dark seja aplicada de forma consistente sem duplicação de regras de estilo.

<br>

## Qualidade Técnica

| Critério | Pontuação |
|---|---|
| Performance | 100/100 |
| Acessibilidade | 95/100 |
| Práticas Recomendadas | 100/100 |
| SEO | 100/100 |

> Auditoria realizada via Google Lighthouse em ambiente local.
