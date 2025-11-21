<script lang="ts">
  import { onMount } from 'svelte';
  import { Heading } from "flowbite-svelte";
  import NewsTable from '../../components/NewsTable.svelte';
  import { goto } from '$app/navigation';
  import Menu from '../../components/Menu.svelte';
  import { getCurrentUser, getToken, type User } from "$lib/auth";
  import api from '$lib/api';

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

  let noticias = [];
  let erro = '';
  let pesquisa = '';
  let carregando = true;

  // Busca pela manchete
  async function filtro(pesquisa: string) {
  
    carregando = true;

    try {
      const res = await api.get(`/news?search=${pesquisa}`);
      
      if (!res.data.data || res.data.sucess || res.data.data.length === 0) {
        erro = res.data.message || 'Nenhuma noticia encontrada.';
        noticias = [];
        
        return;
      }

      noticias = res.data.data;
      console.log(noticias);
    } catch (e: any) {
      console.error('Erro ao carregar noticias:', e);
      erro = e.response?.data?.message || 'Erro ao carregar noticias';
    } finally {
      carregando = false;
    }

  }
  onMount(async () => {
    updateAuthStatus();
  });
</script>

<svelte:head>
<title>News - TheGreenCup</title>
</svelte:head>
<Menu />

<div class="grid-flow-col grid-rows-3 gap-4 text-center pt-32">
  <div class="row-start-1 row-end-4 items-center justify-between max-w-3xl mx-auto mb-6">
    <Heading tag="h2" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white justify-center">
      Notícias
    </Heading>
  </div> <!--fazer um form pra dar enter no teclado-->
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
          {#if user?.role === 'admin'} <!-- só exibe botão criar para admin --> 
          <div class="row-start-1 row-end-4 gap-2 pt-6">
          <button class="gap-2 px-4 py-2  bg-green-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 text-white rounded-lg font-semibold" on:click={() => goto('/news/new')}>
            Adicionar
          </button>
          </div>
          {/if}
      {/if}
  {#if erro}
    <div class="text-red-500 my-4">{erro}</div>
  {/if}

  <NewsTable
  {noticias}
  loading={carregando}
  error={erro}
  on:delete={(e) => {
    const id = e.detail;
    noticias = noticias.filter(noticia => noticia.id !== id);
  }}
/>
</div>