<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import ConfirmModal from './ConfirmModal.svelte';
  import { UserEditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';
  import api from '$lib/api';
  import { onMount } from 'svelte';
  import { getCurrentUser, getToken, type User } from '$lib/auth';

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

  type Ong = {
    id: number;
    nome: string;
    link: string;
    objetivo: string;
    img: string;
  };

  export let ongs: Ong[] = [];
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
    await api.delete(`/ongs/${id}`);
    dispatch('delete', id); // ← Emite evento pro pai
  } catch (e) {
    erroComponenteFilho = 'Erro ao remover ong.';
  } finally {
    deletingId = null;
  }
}

onMount(async () => {
    try {
      const res = await api.get('/ongs');
      ongs = res.data.data;
      console.log(ongs);
    } catch (e: any) {
      console.error('Erro ao carregar ongs:', e);
      erroComponenteFilho = e.response?.data?.message || 'Erro ao carregar ongs';
    } finally {
      loading = false;
    }
  });

  onMount(async () => {
      updateAuthStatus();
	});
</script>

{#if loading}
  <div class="my-8 text-center text-gray-500">Carregando ongs...</div>
{:else if erroComponenteFilho}
  <div class="my-4 text-red-500 text-center">{erroComponenteFilho}</div>
{:else if erro}
  <div> class="my-4 text-red-500 text-center"{erro}</div> 
{:else if ongs.length === 0}
  <div class="my-8 text-center text-gray-500">Nenhuma ong encontrada.</div>
{:else}
  <!-- Tabela (desktop) -->
  <div class="flex flex-wrap p-6 gap-4 justify-center m-5">
    {#each ongs as ong}
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-5">
        <h3 class="text-xl font-semibold text-gray-800 mb-2"><img src="{ong.img}" alt=""><a href="{ong.link}">{ong.nome}</a></h3>
        <p class="text-gray-600">{ong.objetivo}</p>
      </div>
      {#if hasToken}
            {#if user?.role === 'admin'} 
      <div>
        <button title="Editar" on:click={() => goto(`/ongs/edit/${ong.id}`)}>
          <UserEditOutline class="w-5 h-5 text-primary-500" />
        </button>
        <button
          title="Remover"
          on:click={() => openConfirm(ong.id)}
          disabled={deletingId === ong.id || loading}
        >
          <TrashBinOutline class="w-5 h-5 text-red-400" />
        </button>
      </div>
        {/if}
    {/if}
  {#if erro}
    <div class="text-red-500 my-4">{erro}</div>
  {/if}
    </div>
    {/each}
  </div>
{/if}

<ConfirmModal
  open={confirmOpen}
  message="Tem certeza que deseja remover esta Ong?"
  confirmText="Remover"
  cancelText="Cancelar"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>