## Casos de Uso:

### Caso de uso 1: Cadastro de usuário.
#### Atores:
- Usuário.
#### Fluxo principal:
- O usuário clica no botão de cadastrar.
- O sistema direciona o usuário para a página de cadastro com um formulário. 
- O usuário insere as informações do formulário(insere email, cria um senha e um nome usuário).
- O sistema verifica no banco de dados se as informações estão disponíveis.
- O banco de dados retorna verdadeiro.
- O sistema cria a conta para o novo usuário registrando as informações no banco de dados.
- O sistema redireciona o usuário para a página inicial do site.
#### Fluxo alternativo A: Email inválido.
- O usuário insere um email.
- O sistema verifica se o email já está sendo usado por alguma conta.
- O sistema informa ao usuário que o email já está sendo usado e sugere o usuário que use outro email.
#### Fluxo alternativo B: Senha diferente dos padrões exigidos.
- O usuário insere uma senha
- O sistema verifica se a senha está dentro dos padrões exigidos (no mínimo 8 caracteres, máximo de 16)
- O sistema exibe uma mensagem de erro. 
- O sistema informa ao usuário que a senha está fora dos padrões.
-  O sistema exibe uma mensagem sugerindo que o usuário coloque a senha correta.

#### Fluxo Alternativo C: Campo vazio.
- O usuário clica no botão de cadastrar.
- O sistema direciona o usuário para a página de cadastro com um formulário. 
- O usuário insere algumas das informações do formulário(insere email, cria um senha e um nome usuário).
- O usuário esquece esquece de preencher um ou algun campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao usuário  que insira os dados no campo vazio.

### Caso de uso 2:Login.
#### Atores:
- Usuário
#### Fluxo principal:
- O sistema exibirá na página um formulário para o usuário efetuar o login. 
- O usuário insere seu email e senha e clica no botão entrar.
- O sistema busca no banco de dados as informações do usuário.
- O sistema verifica se as informações do usuário são corretas.
- O banco de dados retorna verdadeiro.
- O usuário é redirecionado a página inicial com acesso a conta. 
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
#### Fluxo principal:
- O usuário pressiona no botão de excluir conta.
- O sistema solicita a senha do usuário para continuar o processo.
- O usuário insere a senha.
- O sistema verifica a senha no banco de dados.
- O banco de dados retorna verdadeiro
- O sistema apaga os dados da conta do usuário.
- O sistema atualiza as contas no banco de dados.
- O banco de dados retorna verdadeiro.
- o sistema exibe mensagem de sucesso.
- O sistema exibe a janela de cadastro do site.
#### Fluxo alternativo A: Senha incorreta.
- O sistema pede que o usuário insira a senha para continuar o processo de exclusão da conta.
- O usuário insera a senha.
- O sistema verifica no banco de dados se a senha está correta.
- O sistema envia uma mensagem de erro e pede ao usuário que ele insira a senha correta.
- O sistema verifica se senha  esta correta,
- O sistema faz a operação exigida e envia o usuário para a área de login e cadastro.
### Caso de uso 4: Logout:
####  Atores:
- Usuário 
- Admin.
#### Fluxo principal:
- O usuário Pressiona no botão de logout.
- O sistema exibe um botão de confirmamento de logout para o usuário.
- O usuário confirma.
- O sistema remove o login do usuário.
- O sistema direciona o usuário a página inicial.
### Caso de uso 5: Pesquisa de notícias por palavras chaves.
#### Atores : 
- Usuário
#### Fluxo principal:
- O usuário pressiona na barra de pesquisa.
- O usuário insere um texto contendo palavras cheves.
- O sistema busca no banco de dados as notícias com as palavras chaves inseridas.
- O banco de dados retorna as notícias que possuem as palavras chaves.
- O sistema exibe as notícias correspondentes. 
#### Fluxo alternativo A: palavra chave não encontrada.
- O usuário insere um texto contendo palavras cheves.
- O sistema busca no banco de dados.
- O banco de dados retorna falso.
- O sistema exibe uma mensagem de nenhuma notícia encontrada.
### Caso de uso 6: Busca de notícias por data.
#### Atores : 
- Usuário
#### Fluxo principal: 
- O usuário pressiona na barra de pesquisa.
- O usuário pressiona a opção data.
- O usuário insere uma data.
- O sistema busca no banco de dados as notícias com a data inserida.
- O banco de dados retorna as notícias que possuem a data inserida.
- O sistema exibe as notícias correspondentes.
### Caso de uso 7: Publicação de notícias.
#### Atores:
- Administrador.
#### Fluxo principal:
- O Administrador clica no botão de publicar nova notícia.
- O sistema exibi uma pagina de publicação com formulário.
- O Administrador insere os dados (manchete,data,imagem e autor.)
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema solicita senha ao administrador.
- O administrador insere a senha correta.
- O sistema verifica no banco de dados se a senha está correta.
- O banco de dados retorna verdadeiro. 
- O sistema cadastra a notícia no dados no banco de dados.
- O sistema adiciona a notícia no catalogo.
- O sistema envia uma mensagem de sucesso.
#### Fluxo Alternativo A: Campo vazio.
- O Administrador clica na opção de publicar nova notícia.
- O sistema exibi uma pagina de publicação com formulário.
- O Administrador esquece de preencher todos os campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao administrador que preencha todos os campos.
#### Fluxo Alternativo B: Senha invalida.
- O Administrador clica no botão de publicar nova notícia.
- O sistema exibi uma pagina de publicação com formulário.
- O Administrador insere os dados (manchete,data,imagem e autor.)
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
### Caso de uso 8: Remoção de notícias.
#### Atores : 
- Administrador.
#### Fluxo principal: 
- O Administrador seleciona uma notícia no banco de dados.
- O administrador clica no botão de remover notícia.
- O sistema solicita a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema deleta a notícia do banco de dados.
- O sistema atualiza a página de notícia.
- O sistema exibe mensagem de sucesso.
#### Fluxo Alternativo A: Senha invalida.
- O Administrador seleciona uma notícia no banco de dados.
- O sistema exibe a notícia buscada.
- O administrador clica a opção de remover notícia.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
- O sistema pede para o Administrador inserir a senha corretamente.
### Caso de uso 9: Alteração de notícia.
#### Atores : 
- Administrador 
#### Fluxo principal: 
- O administrador busca a notícia que deseja modificar.
- O sistema busca ao banco de dados a notícia buscada.
- O banco de dados retorna a notícia buscada.
- O sistema exibe a notícia buscada.
- O administrador pressiona no botão de modificar notícia.
- O sistema envia exibe opções para modificar a notícia.
- O administrador seleciona o que deseja modificar.
- O administrador modifica a característica selecionada.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema atualiza as modificações.
- O sistema envia ao banco de dados as modificações.
- O sistema atualiza a página da notícia.
- O sistema exibe uma mensagem de sucesso.
#### Fluxo Alternativo A: Senha invalida.
- O Administrador seleciona uma notícia no banco de dados.
- O sistema exibe a notícia buscada.
- O administrador clica na opção de alterar notícia.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
- O sistema pede para o Administrador inserir a senha corretamente.
#### Fluxo Alternativo B:Campo vazio.
- O administrador busca a notícia que deseja modificar no banco de dados.
- O sistema busca no banco de dados a notícia buscada.
- O banco de dados retorna verdadeiro.
- O sistema exibe a notícia buscada.
- O administrador pressiona no botão de modificar notícia.
- O sistema envia exibe opções para modificar a notícia.
- O administrador seleciona o que deseja modificar.
- O administrador não preenche os campos corretamente.
- O sistema exibe uma mensagem de erro dizendo que os campos não foram preenchidos corretamente.
### Caso de uso 10: Cadastrar ONGs.
#### Atores:
- Administrador.
#### Fluxo principal:
- O Administrador clica no botão de cadastrar nova ONG.
- O sistema exibi uma pagina de cadastro com formulário.
- O Administrador insere os dados (nome,link,objetivo,imagem).
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema solicita senha ao administrador.
- O administrador insere a senha correta.
- O sistema verifica no banco de dados se a senha está correta.
- O banco de dados retorna verdadeiro. 
- O sistema cadastra a ONG no dados no banco de dados.
- O sistema adiciona a ONG no catálogo.
- O sistema envia uma mensagem de sucesso.
#### Fluxo Alternativo A: Campo vazio.
- O Administrador clica na opção de cadastrar nova ONG.
- O sistema exibi uma pagina de cadastro com formulário.
- O Administrador esquece de preencher todos os campos.
- O sistema exibe uma mensagem no campo vazio e solicita ao administrador que preencha todos os campos.
#### Fluxo Alternativo B: Senha invalida.
- O Administrador clica no botão de cadastrar nova ONG.
- O sistema exibi uma pagina de cadastro com formulário.
- O Administrador insere os dados (nome,link,objetivo,imagem).
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
### Caso de uso 11: Remoção de ONGs.
#### Atores : 
- Administrador.
#### Fluxo principal: 
- O Administrador seleciona uma ONG no banco de dados.
- O administrador clica no botão de remover ONG.
- O sistema solicita a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema deleta a ONG do banco de dados.
- O sistema atualiza a página de ONGs.
- O sistema exibe mensagem de sucesso.
#### Fluxo Alternativo A: Senha invalida.
- O Administrador seleciona uma ONG no banco de dados.
- O sistema exibe a ONG buscada.
- O administrador clica a opção de remover ONG.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
- O sistema pede para o Administrador inserir a senha corretamente.
### Caso de uso 12: Alteração de ONGs.
#### Atores : 
- Administrador 
#### Fluxo principal: 
- O administrador busca a ONG que deseja modificar.
- O sistema busca ao banco de dados a ONG buscada.
- O banco de dados retorna a ONG buscada.
- O sistema exibe a ONG buscada.
- O administrador pressiona no botão de modificar ONG.
- O sistema envia exibe opções para modificar a ONG.
- O administrador seleciona o que deseja modificar.
- O administrador modifica a característica selecionada.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema atualiza as modificações.
- O sistema envia ao banco de dados as modificações.
- O sistema atualiza a página de ONGs.
- O sistema exibe uma mensagem de sucesso.
#### Fluxo Alternativo A: Senha invalida.
- O Administrador seleciona uma ONG no banco de dados.
- O sistema exibe a ONG buscada.
- O administrador clica na opção de alterar ONG.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha errada.
- O sistema exibe uma mensagem de senha invalida.
- O sistema pede para o Administrador inserir a senha corretamente.
#### Fluxo Alternativo B:Campo vazio.
- O administrador busca a ONG que deseja modificar no banco de dados.
- O sistema busca no banco de dados a ONG buscada.
- O banco de dados retorna verdadeiro.
- O sistema exibe a OMG buscada.
- O administrador pressiona no botão de modificar ONG.
- O sistema envia exibe opções para modificar a ONG.
- O administrador seleciona o que deseja modificar.
- O administrador não preenche os campos corretamente.
- O sistema exibe uma mensagem de erro dizendo que os campos não foram preenchidos corretamente.
### Caso de uso 13: Doar para ONG.
#### Atores : 
- Usuário
#### Fluxo principal: 
- O usuário pressiona na ONG que deseja efetuar uma doação.
- O sistema busca no banco de dados a ONG buscada.
- O sistema exibe uma pagina com as informações e o link da ONG selecionada.
- O usuário clica no link e é direcionado para a pagina oficial de doação da ONG selecionada.