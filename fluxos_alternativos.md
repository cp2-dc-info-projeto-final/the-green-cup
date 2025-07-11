## Casos de Uso:

### Caso de uso 1: Cadastro de usuário.
#### Atores:
- Usuário.
#### Fluxo alternativo A: Email inválido.
- O usuário insere um email.
- O sistema verifica se o email já está sendo usado por alguma conta.
- O sistema informa ao usuário que o email já está sendo usado e sugere o usuário que use outro email.
#### Fluxo alternativo B: Senha diferente dos padrões exigidos.
- O usuário insere uma senha
- O sistema verifica se a senha está dentro dos padrões exigidos (no mínimo 8 caracteres, máximo de 16)
- O sistema exibe uma mensagem de erro. 
- O sistema informa ao usuário que a senha está fora dos padrões.
- O sistema exibe uma mensagem sugerindo que o usuário coloque a senha correta.

#### Fluxo Alternativo C: Campo vazio.
- O usuário clica no botão de cadastrar.
- O sistema direciona o usuário para a página de cadastro com um formulário. 
- O usuário insere algumas das informações do formulário(insere email, cria um senha e um nome usuário).
- O usuário esquece esquece de preencher um ou algun campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao usuário  que insira os dados no campo vazio.

### Caso de uso 2:Login.
#### Atores:
- Usuário
#### Fluxo alternativo A: Email inválido.
- O usuário insere um email.
- O sistema verifica se o email está cadastrado no banco de dados.
- O sistema informa ao usuário que o email não está cadastrado no banco de dados.
- O sistema sugere ao usuário verificar o email ou iniciar um cadastro.
#### Fluxo alternativo B: Senha inválida.
- O usuário insere uma senha
- O sistema verifica se a senha está correta.
- O sistema exibe uma mensagem dizendo que a senha está inválida. 
- O sistema exibe uma mensagem sugerindo que o usuário insira a senha correta.
#### Fluxo Alternativo C: Campo vazio
- O sistema exibirá na página um formulário para o usuário efetuar o login
- - O usuário esquece esquece de preencher um ou algun campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao usuário que insira os dados no campo vazio.
- O usuário insere todas as informações no  formulário(insere email e a senha )
- O sistema verifica no banco de dados se as informações estão corretas.
- O banco de dados retorna verdadeiro.
- O sistema redireciona o usuário para a página inicial do site.

### Caso de 3: Exclusão de perfil.
#### Atores:
- Usuário
- Administrador 
#### Fluxo alternativo A: Senha incorreta.
- O sistema pede que o usuário insira a senha para continuar o processo de exclusão da conta.
- O usuário insera a senha.
- O sistema verifica no banco de dados se a senha está correta.
- O sistema envia uma mensagem de erro e pede ao usuário que ele insira a senha correta.
- O sistema verifica se senha está correta,
- O sistema faz a operação exigida e envia o usuário para a área de login e cadastro.
### Caso de uso 4: Logout:
####  Atores:
- Usuário 
- Admin.
#### Fluxo alternativo:
- Não há fluxo alternativo de logout
### Caso de uso 5: Pesquisa de notícias por palavras chaves.
#### Atores : 
- Usuário
#### Fluxo alternativo A: palavra chave não encontrada.
- O usuário insere um texto contendo palavras chaves.
- O sistema busca no banco de dados.
- O banco de dados retorna falso.
- O sistema exibe uma mensagem de nenhuma notícia encontrada.
### Caso de uso 6: Busca de notícias por data.
#### Atores : 
- Usuário
#### Fluxo alternativo: 
- Não há fluxo alternativo de busca por notícias
### Caso de uso 7: Publicação de notícias.
#### Atores:
- Administrador.
#### Fluxo Alternativo A: Campo vazio.
- O Administrador clica na opção de publicar nova notícia.
- O sistema exibi uma página de publicação com formulário.
- O Administrador esquece de preencher todos os campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao Administrador que preencha todos os campos.
#### Fluxo Alternativo B: Senha inválida.
- O Administrador clica no botão de publicar nova notícia.
- O sistema exibi uma página de publicação com formulário.
- O Administrador insere os dados (manchete, data, imagem e autor.)
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha inválida.
### Caso de uso 8: Remoção de notícias.
#### Atores : 
- Administrador.
#### Fluxo Alternativo A: Senha inválida.
- O Administrador seleciona uma notícia no banco de dados.
- O sistema exibe a notícia buscada.
- O Administrador clica a opção de remover notícia.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha inválida.
- O sistema pede para o Administrador inserir a senha corretamente.
### Caso de uso 9: Alteração de notícia.
#### Atores : 
- Administrador 
#### Fluxo Alternativo A: Senha inválida.
- O Administrador seleciona uma notícia no banco de dados.
- O sistema exibe a notícia buscada.
- O Administrador clica na opção de alterar notícia.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha inválida.
- O sistema pede para o Administrador inserir a senha corretamente.
#### Fluxo Alternativo B:Campo vazio.
- O Administrador busca a notícia que deseja modificar no banco de dados.
- O sistema busca no banco de dados a notícia buscada.
- O banco de dados retorna verdadeiro.
- O sistema exibe a notícia buscada.
- O Administrador pressiona no botão de modificar notícia.
- O sistema envia exibe opções para modificar a notícia.
- O Administrador seleciona o que deseja modificar.
- O Administrador não preenche os campos corretamente.
- O sistema exibe uma mensagem de erro dizendo que os campos não foram preenchidos corretamente.
### Caso de uso 10: Cadastrar ONGs.
#### Atores:
- Administrador.
#### Fluxo Alternativo A: Campo vazio.
- O Administrador clica na opção de cadastrar nova ONG.
- O sistema exibi uma página de cadastro com formulário.
- O Administrador esquece de preencher todos os campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao Administrador que preencha todos os campos.
#### Fluxo Alternativo B: Senha inválida.
- O Administrador clica no botão de cadastrar nova ONG.
- O sistema exibi uma página de cadastro com formulário.
- O Administrador insere os dados (nome,link,objetivo,imagem).
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha inválida.
### Caso de uso 11: Remoção de ONGs.
#### Atores : 
- Administrador.
#### Fluxo Alternativo A: Senha inválida.
- O Administrador seleciona uma ONG no banco de dados.
- O sistema exibe a ONG buscada.
- O Administrador clica a opção de remover ONG.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha inválida.
- O sistema pede para o Administrador inserir a senha corretamente.
### Caso de uso 12: Alteração de ONGs.
#### Atores : 
- Administrador 
#### Fluxo Alternativo A: Senha inválida.
- O Administrador seleciona uma ONG no banco de dados.
- O sistema exibe a ONG buscada.
- O Administrador clica na opção de alterar ONG.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha inválida.
- O sistema pede para o Administrador inserir a senha corretamente.
#### Fluxo Alternativo B:Campo vazio.
- O Administrador busca a ONG que deseja modificar no banco de dados.
- O sistema busca no banco de dados a ONG buscada.
- O banco de dados retorna verdadeiro.
- O sistema exibe a OMG buscada.
- O Administrador pressiona no botão de modificar ONG.
- O sistema envia exibe opções para modificar a ONG.
- O Administrador seleciona o que deseja modificar.
- O Administrador não preenche os campos corretamente.
- O sistema exibe uma mensagem de erro dizendo que os campos não foram preenchidos corretamente.
### Caso de uso 13: Doar para ONG.
#### Atores : 
- Usuário
#### Fluxo alternativo: 
- Não há fluxo alternativo de doação para uma ONG.