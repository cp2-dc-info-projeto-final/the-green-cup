<script lang="ts">
  import { onMount } from 'svelte';
  import { Heading } from 'flowbite-svelte';
  import UsersTable from '../../components/UsersTable.svelte';
  import { UserAddOutline } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';
  import { Search, Button } from 'flowbite-svelte';

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
    alert("Quase lá!")

    try {
      const res = await fetch(`http://localhost:3000/users?search=${encodeURIComponent(pesquisa)}`);
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

<div class="text-center p-8 pt-32">
  <div class="flex items-center justify-between max-w-3xl mx-auto mb-6">
    <Heading tag="h2" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
      Usuários
    </Heading>
    <div class="flex gap-2">
      <input
        type="text"
        class="border rounded px-3 py-2"
        placeholder="Pesquisar"
        bind:value={pesquisa}
      />
      <button
        type="button"
        on:click={() => filtro(pesquisa)}
        class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold shadow transition"
      >
        Pesquisar
      </button>
    </div>
    <button class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold shadow transition" on:click={() => goto('/users/new')}>
      <UserAddOutline class="w-5 h-5" />
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