<script lang="ts">
    import { onMount } from 'svelte';
    import { Heading, P, ImagePlaceholder } from "flowbite-svelte";
    import OngsTable from '../../components/OngsTable.svelte';
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

<!--<div>
    <div class="text-center pt-32">
        <Heading tag="h1" class=" pb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Doações</Heading>
    </div>
    <div class="flex grid grid-cols-4 gap-4">
        <div class=" col-start-1 col-end-1">
            <img class="h-auto max-w-xs rounded-lg" src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/10/floresta-amazonica.jpg" alt="">
        </div>
        <div class="col-start-1 col-end-1">
            <p><a href="https://ongzoe.org/?form=doe">Doe para a Ong Zoé</a></p>
        </div> 
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-100 p-6">
            <img class="mx-auto w-1/2 h-auto object-cover rounded-lg" src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/10/floresta-amazonica.jpg" alt="">
            <p class="text-center text-xl font-semibold"><a href="https://ongzoe.org/?form=doe">DOE PARA ONG ZOÉ</a></p>
        </div>
        <div class="bg-gray-100 p-6">
            <img class="mx-auto w-1/2 h-auto object-cover rounded-lg" src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/10/floresta-amazonica.jpg" alt="">
            <p class="text-center text-xl font-semibold"><a href="https://ongzoe.org/?form=doe">DOE PARA ONG ZOÉ</a></p>
        </div>
        <div class="bg-gray-100 p-6">
            <img class="mx-auto w-1/2 h-auto object-cover rounded-lg" src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/10/floresta-amazonica.jpg" alt="">
            <p class="text-center text-xl font-semibold"><a href="https://ongzoe.org/?form=doe">DOE PARA ONG ZOÉ</a></p>
        </div>
        <div class="bg-gray-100 p-6">
            <img class="mx-auto w-1/2 h-auto object-cover rounded-lg" src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/10/floresta-amazonica.jpg" alt="">
            <p class="text-center text-xl font-semibold"><a href="https://ongzoe.org/?form=doe">DOE PARA ONG ZOÉ</a></p></div>
        <div class="bg-gray-100 p-6">
            <img class="mx-auto w-1/2 h-auto object-cover rounded-lg" src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/10/floresta-amazonica.jpg" alt="">
            <p class="text-center text-xl font-semibold"><a href="https://ongzoe.org/?form=doe">DOE PARA ONG ZOÉ</a></p>
        </div>
        <div class="bg-gray-100 p-6">
            <img class="mx-auto w-1/2 h-auto object-cover rounded-lg" src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/10/floresta-amazonica.jpg" alt="">
            <p class="text-center text-xl font-semibold"><a href="https://ongzoe.org/?form=doe">DOE PARA ONG ZOÉ</a></p>
        </div>
      </div>
</div>-->

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
              type="text"
              class="border rounded px-3 py-2"
              placeholder="Pesquisar"
              bind:value={pesquisa}
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
          <button class="gap-2 px-4 py-2  bg-green-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 text-white rounded-lg font-semibold" on:click={() => goto('/ongs/new')}>
            Adicionar
          </button>
          </div>
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
