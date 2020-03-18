## :rocket: Sobre a aplicação

A desafio é baseado em um app feito em React Native utilizando um emulador Android.

O app possui 3 telas, onde na tela principal possui um campo para adição de um usuário do github.
Logo abaixo de cada usuário adicionado, possui um botão que redireciona para todos os repositórios em que o usuário marcou com estrela.
Ao clicar em cada repositório ele redireciona para um WebView daquele repositório em questão.

### Funcionalidades

As funcionalidades desenvolvidas neste desafio foram:

#### 1. Loading de repositórios

Foi adicionado um indicador de loading utilizando `<ActivityIndicator />` antes de carregar a lista de repositórios favoritados na tela de detalhes do Usuário.

#### 2. Scroll infinito

Adicionada a funcionalidade de scroll infinito na lista de repositórios favoritados. Assim que o usuário chegar nos **20%** do final de lista, é feita a busca dos items da próxima página e adicionada na lista. Isso foi possível através das propriedades abaixo:

```js
<Stars
  onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
  onEndReached={this.loadMore} // Função que carrega mais itens
  // Restante das props
>
```

#### 3. Pull to Refresh

Adicionada a funcionalidade que quando o usuário arrasta a listagem de repositórios favoritados pra baixo, a lista é atualizada resetando o estado, ou seja, voltando o estado da paginação para a página 1 exibindo apenas os 30 primeiros itens.

A funcionalidade "Pull to Refresh" existe por padrão na FlatList e pode ser implementada através do seguinte código:

```js
<Stars
  onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
  refreshing={this.state.refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
  // Restante das props
>
```

#### 4. WebView

Foi criada uma nova página na aplicação que é acessada quando o usuário clica em um repositório favoritado, essa página contém apenas o Header da aplicação. O conteúdo da página é um WebView, ou seja, um browser integrado que exibe o atributo `html_url` presente no objeto do repositório que vem da API do Github.

Documentação de utilização da [WebView](https://github.com/react-native-community/react-native-webview/blob/master/docs/Getting-Started.md).

Exemplo de código:

```js
<WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
```

Resultado:

![WebView](.github/exemplo-web-view.png)
