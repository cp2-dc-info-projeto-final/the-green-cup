<!DOCTYPE svelteHTML>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="vever.ico" type="image/x-icon">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>GreenCup</title>
</head>
<body>
    <script>
            document.querySelector('form').addEventListener('submit', async function(event) {
            event.preventDefault(); // Evita recarregar a página
        
            const nome = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmar = document.getElementById('Confirmar').value;
        
            if (senha !== confirmar) {
                alert('As senhas não coincidem.');
                return;
            }
        
            try {
                const response = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: nome,
                        email: email
                        // Se quiser salvar a senha, adicione no backend e aqui também.
                    })
                });
        
                const data = await response.json();
                if (response.ok) {
                    alert('Usuário cadastrado com sucesso!');
                } else {
                    alert(`Erro: ${data.message}`);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Erro ao tentar cadastrar. Tente novamente mais tarde.');
            }
        });
        </script>
    
    <nav class="bg-white border-green-200 dark:bg-green-900">
        <div id="menu" class="flex flex-wrap items-center justify-between max-w-screen-2xl mx-auto p-4">
            <a href="linkdahome" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="vever.png" class="w-10 h-10 rounded-full" alt="The Green Cup Logo" />
                <span class="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">The Green Cup</span>
            </a>
            <div id="mega-menu" class="items-center justify-end hidden w-full md:flex md:w-auto md:order-1">
                <ul class="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                    <li>
                        <a href="Sobre.html" class="block py-2 px-3 text-white border-b border-gray-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 dark:text-green-500 md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-green-700 md:w-1/4 lg:w-1/8">
                        Home</a>
                    </li>    
                    <li>
                        <a href="Noticias.html" class="block py-2 px-3 text-white border-b border-gray-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700 md:w-1/4 lg:w-1/8">
                        Noticias</a>
                    </li> 
                    <li>
                        <a href="Doacoes.html" class="block py-2 px-3 text-white border-b border-green-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700 md:w-1/4 lg:w-1/8">
                        Doações</a>    
                    </li>
                    <li>
                        <a href="/cadastro" class="block py-2 px-3 text-white border-b border-green-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700 md:w-1/4 lg:w-1/8">
                        Cadastro</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    <nav class="bg-white border-green-200 dark:bg-green-900">
        <div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
            <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="vever.png" class="w-10 h-10 rounded-full" alt="The Green Cup Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">The Green Cup</span>
            </a>
            
            <div id="mega-menu" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                <ul class="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                    <li>
                        <a href="Sobre.html" class="block py-2 px-3 text-green-900 border-b border-green-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700 md:w-1/4 lg:w-1/8">
                        Sobre</a>
                    </li>    
                    <li>
                        <a href="Noticias.html" class="block py-2 px-3 text-green-900 border-b border-green-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700 md:w-1/4 lg:w-1/8">
                        Noticias</a>
                    </li> 
                    <li>
                        <a href="Doacoes.html" class="block py-2 px-3 text-green-900 border-b border-green-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-gray-700 md:w-1/4 lg:w-1/8">
                        Doações</a>    
                    </li>
                    <li>
                        <a href="/cadastro" class="block py-2 px-3 text-green-600 border-b border-gray-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 dark:text-green-500 md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-green-500 md:dark:hover:bg-transparent dark:border-green-700 md:w-1/4 lg:w-1/8"  aria-current="page">
                        Cadastro</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    

<form class="max-w-sm mx-auto pt-6">
    <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Nome:</label>
        <input type="name" id="name" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Coloque o seu nome" required />
      </div>
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Seu email:</label>
      <input type="email" id="email" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Coloque o seu email" required />
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Sua senha:</label>
      <input type="password" id="senha" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Senha" required />
    </div>
    <div class="mb-5">
      <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirmar senha:</label>
      <input type="password" id="Confirmar" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Confirmar senha" required />
    </div>
    <div class="flex items-start mb-5">
      <div class="flex items-center h-5">
        <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
      </div>
      <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500">Eu concordo com os <a href="termoscondicoes.html" class="text-blue-600 hover:underline dark:text-blue-500">termos e condições</a></label>
      <label for="login" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500">Já sou <a href="Login.html" class="text-blue-600 hover:underline dark:text-blue-500">Cadastrado</a></label>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar usuário</button>
  </form>
  

<footer id="rodadope" class="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-green-600 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-green-800 dark:border-green-600">
    <span class="text-sm text-white sm:text-center dark:text-gray-400">© 2025 <a href="Sobre.html" class="hover:underline">The Green cup™</a>. Todos os direitos reservados.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
        <li>
            <a href="Sobre.html" class="hover:underline me-4 md:me-6">Home</a>
        </li>
        <li>
            <a href="Noticias.html" class="hover:underline me-4 md:me-6">Noticias</a>
        </li>
        <li>
            <a href="Doacoes.html" class="hover:underline me-4 md:me-6">Doações</a>
        </li>
        <li>
            <a href="/cadastro" class="hover:underline me-4 md:me-6">Cadastro</a>
        </li>
        <div class="sm:flex sm:items-center sm:justify-between">
            <div class="flex mt-4 sm:justify-center sm:mt-0">
                <a href="#" class="text-white hover:text-gray-900 dark:hover:text-white">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                          <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                      </svg>
                    <span class="sr-only">Página no Facebook</span>
                </a>
                <a href="#" class="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                          <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                      </svg>
                    <span class="sr-only">Comunidade no Discord</span>
                </a>
                <a href="#" class="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                      <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                  </svg>
                    <span class="sr-only">Página no Twitter</span>
                </a>
                <a href="#" class="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                    </svg>
                    <span class="sr-only">Conta no GitHub</span>
                </a>
                <a href="#" class="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                  </svg>
                    <span class="sr-only">Conta no Dribbble</span>
                </a>
            </div>
        </div>
    </ul>
</footer>


</body>
</html>