<script lang="ts">
    import { onMount } from 'svelte';
    import { Heading, P, ImagePlaceholder } from "flowbite-svelte";
    import NewsTable from '../../components/NewsTable.svelte';
    import { UserAddOutline } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';
    import { Search, Button } from 'flowbite-svelte';
    import Menu from '../../components/Menu.svelte';
    import { getCurrentUser } from '$lib/auth';

    onMount(async () => {
      const user = await getCurrentUser();
      if (!user) {
        goto('/login');
      } else if (user.role !== 'admin') {
        goto('/');
      }
    });

    let news = [];
    let erro = '';
    let pesquisa = '';
    let carregando = true;

    // Carrega noticias na primeira vez
    onMount(async () => {
      await carregarNews();
    });

    // Função para carregar todos as noticias
    async function carregarNews() {
      carregando = true;
      erro = '';
      try {
        const res = await fetch('http://localhost:5173/news');
        const data = await res.json();
        news = data.data || [];
      } catch (e) {
        erro = 'Erro ao carregar as noticias.';
      } finally {
        carregando = false;
      }
    }

    // Busca por nome
    async function filtro(pesquisa: string) {
      erro = '';
      carregando = true;

      try {
        const res = await fetch(`http://localhost:3000/news?search=${pesquisa}`);
        const data = await res.json();

        if (!data.success || !data.data || data.data.length === 0) {
          erro = data.message || 'Nenhuma noticia encontrado.';
          news = [];
          
          return;
        }

        news = data.data;
      } catch (e) {
        erro = 'Erro ao buscar noticias.';
        news = [];
      } finally {
        carregando = false;
      }
    }
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
          <div class="row-start-1 row-end-4 gap-2 pt-6">
          <button class="gap-2 px-4 py-2  bg-green-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 text-white rounded-lg font-semibold" on:click={() => goto('/news/new')}>
            Adicionar
          </button>
          </div>
    {#if erro}
      <div class="text-red-500 my-4">{erro}</div>
    {/if}

    <NewsTable
    {news}
    loading={carregando}
    error={erro}
    on:delete={(e) => {
      const id = e.detail;
      news = news.filter(news => news.id !== id);
    }}
  />
</div>