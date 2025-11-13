<script lang="ts">
  import { onMount } from 'svelte';
  import { Heading, P, ImagePlaceholder } from "flowbite-svelte";
  import UsersTable from '../../components/UsersTable.svelte';
  import { goto } from '$app/navigation';
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

  let users = [];
  let erro = '';
  let pesquisa = '';
  let carregando = true;

  // Carrega usuários na primeira vez
  onMount(async () => {
    await carregarUsuarios();
  });

  // Função para carregar todos os usuários
  async function carregarUsuarios() {
    carregando = true;
    erro = '';
    try {
      const res = await fetch('http://localhost:3000/users');
      const data = await res.json();
      users = data.data || [];
    } catch (e) {
      erro = 'Erro ao carregar usuários.';
    } finally {
      carregando = false;
    }
  }

  // Busca por nome/login
  async function filtro(pesquisa: string) {
    erro = '';
    carregando = true;

    try {
      const res = await fetch(`http://localhost:3000/users?search=${pesquisa}`);
      const data = await res.json();

      if (!data.success || !data.data || data.data.length === 0) {
        erro = data.message || 'Nenhum usuário encontrado.';
        users = [];
        
        return;
      }

      users = data.data;
    } catch (e) {
      erro = 'Erro ao buscar usuários.';
      users = [];
    } finally {
      carregando = false;
    }
  }
</script>

<svelte:head>
    <title>Usuários - TheGreenCup</title>
</svelte:head>
<Menu />

<div class="grid-flow-col grid-rows-3 gap-4 text-center pt-32">
  <div class="row-start-1 row-end-4 items-center justify-between max-w-3xl mx-auto mb-6">
    <Heading tag="h2" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white justify-center">
      Usuários
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
        <button class="gap-2 px-4 py-2  bg-green-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 text-white rounded-lg font-semibold" on:click={() => goto('/users/new')}>
          Adicionar
        </button>
        </div>
  {#if erro}
    <div class="text-red-500 my-4">{erro}</div>
  {/if}

  <UsersTable
  {users}
  loading={carregando}
  error={erro}
  on:delete={(e) => {
    const id = e.detail;
    users = users.filter(user => user.id !== id);
  }}
/>
</div>