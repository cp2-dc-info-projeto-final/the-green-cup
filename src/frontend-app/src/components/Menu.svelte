<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Heading} from "flowbite-svelte";
  import { onMount } from "svelte";
  import { logout, getCurrentUser, getToken, type User } from "$lib/auth";
  import { goto } from "$app/navigation";
  import { ArrowRightToBracketOutline } from "flowbite-svelte-icons";
  import { page } from "$app/stores";
  
  let user: User | null = null;
  let hasToken = false;
  
  // Array com as rotas da navegação
  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'Sobre' },
    { path: '/news', label: 'Notícias' },
    { path: '/ongs', label: 'Ongs' },
    { path: '/users', label: 'Usuários' }
  ];

  // Função para verificar se um item está ativo
  function isActive(path: string): boolean {
    return $page.url.pathname === path;
  }

  // Verifica token sincronamente (instantâneo)
  function updateAuthStatus() {
    hasToken = getToken() !== null;
    
    // Se tem token, carrega dados do usuário em background
    if (hasToken && !user) {
      getCurrentUser().then(userData => {
        user = userData;
      }).catch(() => {
        user = null;
        hasToken = false;
      });
    } else if (!hasToken) {
      user = null;
    }
  }

  // Reativo à mudança de página
  $: if ($page.url) {
    updateAuthStatus();
  }

  onMount(() => {
    updateAuthStatus();
  });

  // função para logout (só apaga o token)
  async function handleLogout() {
    console.log('Logout iniciado...');
    try {
      await logout();
      user = null; // Limpar estado local
      console.log('Logout concluído, redirecionando...');
      goto('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  }
</script>

<div class="px-8">
  <Navbar class="fixed start-0 top-0 z-20 w-full bg-green-900 px-2 py-2.5 sm:px-4">
    <NavBrand href="/">
      <img src="/images/vever.png" class="me-3 h-6 sm:h-9 rounded-lg" alt="Logo thegreencup" />
      <Heading class="self-center text-xl font-semibold whitespace-nowrap text-green-200 dark:text-white">The Green Cup</Heading>
    </NavBrand>
    <NavHamburger/>
    <NavUl>
      {#each navItems as item}
        {#if item.path !== '/users' || (item.path === '/users' && hasToken && user && user.role === 'admin')}
          <NavLi 
            href={item.path} 
            class="text-lg font-bold px-4 py-2 rounded-lg transition-colors duration-200 {isActive(item.path) 
              ? 'text-green-600 dark:bg-green-800 dark:text-green-300' 
              : 'text-gray-300 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-300 dark:hover:bg-green-800/50'}"
>
            {item.label}
          </NavLi>
  
        {/if}
      {/each}
      
      {#if hasToken}
        {#if user} <!-- se existir usuário é porque conseguiu logar-->
          <NavLi>
            <div class="flex items-center">
              <span class="text-primary-500 dark:text-primary-400 px-4 py-2">Olá, {user.nome}</span>
              <button 
                class="ml-2 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm flex items-center gap-1 transition-colors duration-200"
                on:click={handleLogout}
              >
                <ArrowRightToBracketOutline class="w-4 h-4" />
                Sair
              </button>
            </div>
          </NavLi>
        {/if}
      {:else}
        <!-- se não tem token, exibe botão de login-->
        <NavLi 
          href="/login" 
          class="text-lg font-bold px-4 py-2 rounded-lg transition-colors duration-200 {isActive('/login') 
            ? 'text-green-600 dark:bg-green-800 dark:text-green-300' 
            : 'text-gray-300 dark:text-gray-400 hover:text-green-600 dark:hover:bg-green-800/50'}"
        >
          Login
        </NavLi>
      {/if}
    </NavUl>
  </Navbar>
</div>