<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card } from 'flowbite-svelte';
  import ConfirmModal from './ConfirmModal.svelte';
  import { UserEditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';
  import api from '$lib/api';
  import { onMount } from 'svelte';

  type User = {
    id: number;
    nome: string;
    email: string;
    role: string;
  };

  export let users: User[] = [];
  export let loading: boolean = false;  // Recebe loading do pai
  export let erro: string = '';        // Recebe erro do pai
  let erroComponenteFilho = '';

  let deletingId: number | null = null;
  let confirmOpen = false;
  let confirmTargetId: number | null = null;

  function openConfirm(id: number) {
    confirmTargetId = id;
    confirmOpen = true;
  }

  function closeConfirm() {
    confirmOpen = false;
    confirmTargetId = null;
  }

  function handleConfirm() {
    if (confirmTargetId !== null) {
      handleDelete(confirmTargetId);
    }
    closeConfirm();
  }

  function handleCancel() {
    closeConfirm();
  }

  async function handleDelete(id: number) {
  deletingId = id;
  erroComponenteFilho = '';
  try {
    await api.delete(`/users/${id}`);
    dispatch('delete', id); // ← Emite evento pro pai
  } catch (e) {
    erroComponenteFilho = 'Erro ao remover usuário.';
  } finally {
    deletingId = null;
  }
}

onMount(async () => {
    try {
      const res = await api.get('/users');
      users = res.data.data;
      console.log(users);
    } catch (e: any) {
      console.error('Erro ao carregar usuários:', e);
      erroComponenteFilho = e.response?.data?.message || 'Erro ao carregar usuários';
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="my-8 text-center text-gray-500">Carregando usuários...</div>
{:else if erroComponenteFilho}
  <div class="my-4 text-red-500 text-center">{erroComponenteFilho}</div>
{:else if erro}
  <div> class="my-4 text-red-500 text-center"{erro}</div> 
{:else if users.length === 0}
  <div class="my-8 text-center text-gray-500">Nenhum usuário encontrado.</div>
{:else}
  <!-- Tabela (desktop) -->
  <div class="hidden lg:block">
    <Table class="w-full max-w-3xl mx-auto my-8 shadow-lg border border-gray-200 rounded-lg">
      <TableHead>
        <TableHeadCell class="w-16">ID</TableHeadCell>
        <TableHeadCell class="w-32">Nome</TableHeadCell>
        <TableHeadCell class="min-w-0">Email</TableHeadCell>
        <TableHeadCell class="w-20">Role</TableHeadCell>
        <TableHeadCell class="w-24"></TableHeadCell>
      </TableHead>
      <TableBody>
        {#each users as user}
          <TableBodyRow>
            <TableBodyCell class="border">{user.id}</TableBodyCell>
            <TableBodyCell class="border">{user.nome}</TableBodyCell>
            <TableBodyCell class="border">{user.email}</TableBodyCell>
            <TableBodyCell class="border">{user.role}</TableBodyCell>
            <TableBodyCell class="border">
              <button class="cursor-pointer" title="Editar" on:click={() => goto(`/users/edit/${user.id}`)}>
                <UserEditOutline class="w-5 h-5 text-primary-500" />
              </button>
              <button class="cursor-pointer"
                title="Remover"
                on:click={() => openConfirm(user.id)}
                disabled={deletingId === user.id || loading}
              >
                <TrashBinOutline class="w-5 h-5 text-red-400" />
              </button>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <!-- Cards (mobile) -->
  <div class="block lg:hidden">
    <div class="flex flex-col items-center gap-4 my-8 max-w-3xl mx-auto">
      {#each users as user}
        <Card class="max-w-sm w-full p-0 overflow-hidden shadow-lg border border-gray-200">
          <div class="px-4 pt-4 pb-2 bg-gray-100 flex items-center justify-between">
            <div class="">
              <div class="text-lg font-semibold text-gray-800 text-center">{user.nome}</div>
              <div class="text-xs text-gray-400">ID: {user.id}</div>
            </div>
            <div class="flex gap-2">
              <button class="border" title="Editar" on:click={() => goto(`/users/edit/${user.id}`)}>
                <UserEditOutline class="w-5 h-5 text-primary-500" />
              </button>
              <button class="border"
                title="Remover"
                on:click={() => openConfirm(user.id)}
                disabled={deletingId === user.id || loading}
              >
                <TrashBinOutline class="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
          <div class="px-4 pb-4 pt-2">
            <span class="text-gray-700 text-sm">{user.email}</span>
          </div>
        </Card>
      {/each}
    </div>
  </div>
{/if}

<ConfirmModal
  open={confirmOpen}
  message="Tem certeza que deseja remover este usuário?"
  confirmText="Remover"
  cancelText="Cancelar"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>