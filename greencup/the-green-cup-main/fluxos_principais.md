## Casos de Uso:

### Caso de uso 1: Cadastro de usuário.
#### Atores:
- Usuário.
#### Fluxo principal:
- O usuário clica no botão "Cadastrar".
- O sistema direciona o usuário para a página de cadastro com um formulário. 
- O usuário coloca as informações no formulário(insere um email, cria uma senha e um nome de usuário).
- O sistema verifica no banco de dados se as informações estão disponíveis.
- O banco de dados retorna verdadeiro.
- O sistema cria a conta para o novo usuário registrando as informações no banco de dados.
- O sistema redireciona o usuário para a página inicial do site.

### Caso de uso 2: Login.
#### Atores:
- Usuário.
#### Fluxo principal:
- O sistema exibirá na página um formulário para o usuário efetuar o login. 
- O usuário insere seu email, senha e clica no botão "Entrar".
- O sistema busca no banco de dados as informações do usuário.
- O sistema verifica se as informações do usuário estão corretas.
- O banco de dados retorna verdadeiro.
- O usuário é redirecionado para a página inicial com acesso a conta. 

### Caso de 3: Exclusão de perfil.
#### Atores:
- Usuário.
- Administrador.
#### Fluxo principal:
- O usuário pressiona o botão "Excluir conta".
- O sistema solicita a senha do usuário para continuar o processo.
- O usuário insere a senha.
- O sistema verifica a senha no banco de dados.
- O banco de dados retorna verdadeiro.
- O sistema apaga os dados da conta do usuário.
- O sistema atualiza as contas no banco de dados.
- O banco de dados retorna verdadeiro.
- o sistema exibe mensagem de sucesso.
- O sistema exibe a janela de cadastro do site.

### Caso de uso 4: Logout:
####  Atores:
- Usuário.
- Administrador.
#### Fluxo principal:
- O usuário pressiona o botão "Logout".
- O sistema exibe um botão de confirmamento de logout para o usuário.
- O usuário confirma.
- O sistema remove o login do usuário.
- O sistema direciona o usuário a página inicial.

### Caso de uso 5: Pesquisa de notícias por palavras chaves.
#### Atores: 
- Usuário.
#### Fluxo principal:
- O usuário pressiona na barra de pesquisa.
- O usuário insere um texto contendo palavras chaves.
- O sistema busca no banco de dados as notícias com as palavras chaves inseridas.
- O banco de dados retorna as notícias que possuem as palavras chaves.
- O sistema exibe as notícias correspondentes. 

### Caso de uso 6: Busca de notícias por data.
#### Atores: 
- Usuário.
#### Fluxo principal: 
- O usuário pressiona na barra de pesquisa.
- O usuário pressiona a opção "Data".
- O usuário insere uma data.
- O sistema busca no banco de dados as notícias com a data inserida.
- O banco de dados retorna as notícias que possuem a data inserida.
- O sistema exibe as notícias correspondentes.

### Caso de uso 7: Publicação de notícias.
#### Atores:
- Administrador.
#### Fluxo principal:
- O Administrador clica no botão "Publicar nova notícia".
- O sistema exibe uma página de publicação com um formulário.
- O Administrador insere os dados (manchete, data, imagem e autor.)
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema solicita a senha do Administrador.
- O Administrador insere a senha correta.
- O sistema verifica no banco de dados se a senha está correta.
- O banco de dados retorna verdadeiro. 
- O sistema cadastra a notícia no banco de dados.
- O sistema adiciona a notícia no catálogo.
- O sistema envia uma mensagem de sucesso.

### Caso de uso 8: Remoção de notícias.
#### Atores: 
- Administrador.
#### Fluxo principal: 
- O Administrador seleciona uma notícia no catálogo.
- O Administrador clica no botão "Remover notícia".
- O sistema solicita a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema deleta a notícia do banco de dados.
- O sistema atualiza a página de notícia.
- O sistema exibe mensagem de sucesso.

### Caso de uso 9: Alteração de notícia.
#### Atores: 
- Administrador.
#### Fluxo principal: 
- O Administrador busca a notícia que deseja modificar.
- O sistema busca no banco de dados a notícia buscada.
- O banco de dados retorna a notícia buscada.
- O sistema exibe a notícia buscada.
- O Administrador pressiona no botão "Modificar notícia".
- O sistema envia e exibe opções para modificar a notícia.
- O Administrador seleciona o que deseja modificar.
- O Administrador modifica a característica selecionada.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema atualiza as modificações.
- O sistema envia ao banco de dados as modificações.
- O sistema atualiza a página da notícia.
- O sistema exibe uma mensagem de sucesso.

### Caso de uso 10: Cadastrar ONGs.
#### Atores:
- Administrador.
#### Fluxo principal:
- O Administrador clica no botão "Cadastrar nova ONG".
- O sistema exibe uma página de cadastro com um formulário.
- O Administrador insere os dados (nome, link, objetivo e imagem).
- O sistema verifica se os dados foram inseridos corretamente.
- O sistema solicita a senha do Administrador.
- O Administrador insere a senha correta.
- O sistema verifica no banco de dados se a senha está correta.
- O banco de dados retorna verdadeiro. 
- O sistema cadastra a ONG no dados no banco de dados.
- O sistema adiciona a ONG no catálogo.
- O sistema envia uma mensagem de sucesso.

### Caso de uso 11: Remoção de ONGs.
#### Atores: 
- Administrador.
#### Fluxo principal: 
- O Administrador seleciona uma ONG no catálogo.
- O administrador clica no botão "Remover ONG".
- O sistema solicita a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema deleta a ONG do banco de dados.
- O sistema atualiza a página de ONGs.
- O sistema exibe mensagem de sucesso.

### Caso de uso 12: Alteração de ONGs.
#### Atores: 
- Administrador.
#### Fluxo principal: 
- O Administrador busca a ONG que deseja modificar.
- O sistema busca no banco de dados a ONG buscada.
- O banco de dados retorna a ONG buscada.
- O sistema exibe a ONG buscada.
- O Administrador pressiona no botão "Modificar ONG".
- O sistema envia e exibe opções para modificar a ONG.
- O Administrador seleciona o que deseja modificar.
- O Administrador modifica a característica selecionada.
- O sistema pede a senha do Administrador.
- O Administrador insere a senha corretamente.
- O sistema envia a senha ao banco de dados.
- O banco de dados verifica a senha.
- O banco de dados retorna verdadeiro.
- O sistema atualiza as modificações.
- O sistema envia ao banco de dados as modificações.
- O sistema atualiza a página de ONGs.
- O sistema exibe uma mensagem de sucesso.

### Caso de uso 13: Doar para ONG.
#### Atores : 
- Usuário
#### Fluxo principal: 
- O usuário pressiona na ONG que deseja efetuar uma doação.
- O sistema busca no banco de dados a ONG buscada.
- O sistema exibe uma página com as informações e o link da ONG selecionada.
- O usuário clica no link e é direcionado para a página oficial de doação da ONG selecionada.