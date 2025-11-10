<script lang="ts">
    import { onMount } from 'svelte';
    import { Heading, P, ImagePlaceholder } from "flowbite-svelte";
    import OngsTable from '../../components/OngsTable.svelte';
    import { UserAddOutline } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';
    import { Search, Button } from 'flowbite-svelte';
    import Menu from '../../components/Menu.svelte';
    import { getCurrentUser } from '$lib/auth';
  
    let user: User | null = null;
    let hasToken = false;

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
  
    let ongs = [];
    let erro = '';
    let pesquisa = '';
    let carregando = true;
  
    // Carrega usuários na primeira vez
    onMount(async () => {
      await carregarOngs();
    });
  
    // Função para carregar todos os usuários
    async function carregarOngs() {
      carregando = true;
      erro = '';
      try {
        const res = await fetch('http://localhost:3000/ongs');
        const data = await res.json();
        ongs = data.data || [];
      } catch (e) {
        erro = 'Erro ao carregar as ongs.';
      } finally {
        carregando = false;
      }
    }
  
    // Busca por nome/login
    async function filtro(pesquisa: string) {
      erro = '';
      carregando = true;
  
      try {
        const res = await fetch(`http://localhost:3000/ongs?search=${pesquisa}`);
        const data = await res.json();
  
        if (!data.success || !data.data || data.data.length === 0) {
          erro = data.message || 'Nenhuma Ong encontrado.';
          ongs = [];
          
          return;
        }
  
        ongs = data.data;
      } catch (e) {
        erro = 'Erro ao buscar Ongs.';
        ongs = [];
      } finally {
        carregando = false;
      }
    }
  </script>

<svelte:head>
  <title>Ongs - TheGreenCup</title>
</svelte:head>
  <Menu />
  
  <div class="grid-flow-col grid-rows-3 gap-4 text-center pt-32">
    <div class="row-start-1 row-end-4 items-center justify-between max-w-3xl mx-auto mb-6">
      <Heading tag="h2" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white justify-center">
        Ongs
      </Heading>
    </div>
        <div class="grid grid-flow-col grid-rows-1 gap-3 justify-center">
          <div class="">
            <input
              type="input"
              class="border rounded px-3 py-2"
              placeholder="Pesquisar"
              bind:value={pesquisa}
              on:submit={() => filtro(pesquisa)}
              required />
          </div>
          <div class="">
            <button
                type="button"
                on:click={() => filtro(pesquisa)} class="px-4 py-2 bg-green-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition">
                Pesquisar
            </button>
          </div>
        </div>
        {#if hasToken}
          {#if user} <!-- se existir usuário é porque conseguiu logar-->
            {#if user.role === 'admin'} <!-- só exibe botão criar para admin   TESTE!!!!-->
            <div class="row-start-1 row-end-4 gap-2 pt-6">
            <button class="gap-2 px-4 py-2  bg-green-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 text-white rounded-lg font-semibold" on:click={() => goto('/ongs/new')}>
              Adicionar
            </button>
            </div>
            {/if}
          {/if}
        {/if}
    {#if erro}
      <div class="text-red-500 my-4">{erro}</div>
    {/if}
  
    <OngsTable
    {ongs}
    loading={carregando}
    error={erro}
    on:delete={(e) => {
      const id = e.detail;
      ongs = ongs.filter(ongs => ongs.id !== id);
    }}
  />
  </div>

<!-- Contêiner principal com flexbox, espaçamento e quebra de linha
<div class="flex flex-wrap gap-6 p-6">

  Exemplo de card -->
  <!--<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-6">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlMOOs-JAF_yHSIpuH4ytq5z_OLx1ydviwiw&s" alt="">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Título do Card 1</h3>
      <p class="text-gray-600">Este é o conteúdo do primeiro card.</p>
    </div>
  </div>-->

  <!-- Outros cards -->
  <!--<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Título do Card 2</h3>
      <p class="text-gray-600">Conteúdo do segundo card.</p>
    </div>
  </div>

</div>-->