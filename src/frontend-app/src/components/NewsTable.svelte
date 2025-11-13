<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import ConfirmModal from './ConfirmModal.svelte';
  import { UserEditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';
  import api from '$lib/api';
  import { onMount } from 'svelte';

  type News = {
    id: number;
    manchete: string;
    autor: string;
    data: string;
    img: string;
  };

  export let noticias: News[] = [];
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
    await api.delete(`/news/${id}`);
    dispatch('delete', id); // ← Emite evento pro pai
  } catch (e) {
    erroComponenteFilho = 'Erro ao remover noticia.';
  } finally {
    deletingId = null;
  }
}

onMount(async () => {
    try {
      const res = await api.get('/news');
      noticias = res.data.data;
      console.log(noticias);
    } catch (e: any) {
      console.error('Erro ao carregar noticias:', e);
      erroComponenteFilho = e.response?.data?.message || 'Erro ao carregar noticias';
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="my-8 text-center text-gray-500">Carregando noticias...</div>
{:else if erroComponenteFilho}
  <div class="my-4 text-red-500 text-center">{erroComponenteFilho}</div>
{:else if erro}
  <div> class="my-4 text-red-500 text-center"{erro}</div> 
{:else if noticias.length === 0}
  <div class="my-8 text-center text-gray-500">Nenhuma noticia encontrada.</div>
{:else}
  <!-- Tabela (desktop) -->
  <div class="flex flex-wrap p-6 gap-4 justify-center m-5">
    {#each noticias as news}
    <div class="max-w-sm w-full lg:max-w-full lg:flex justify-center">
      <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border" style="background-image: url('{news.img}')" title="Woman holding a mug">
      </div>
      <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
          <p class="text-sm text-gray-600 flex items-center">
            <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div class="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?</div>
          <p class="text-gray-700 text-base">{news.manchete}</p>
        </div>
        <div class="flex items-center">
          <div class="text-sm">
            <p class="text-gray-900 leading-none">{news.autor}</p>
            <p class="text-gray-600">{news.data}</p>
          </div>
        </div>
        <div class="">
          <button title="Editar" on:click={() => goto(`/news/edit/${news.id}`)}>
            <UserEditOutline class="w-5 h-5 text-primary-500" />
          </button>
          <button
            title="Remover"
            on:click={() => openConfirm(news.id)}
            disabled={deletingId === news.id || loading}
          >
            <TrashBinOutline class="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
    </div>
    {/each}
  </div>
{/if}

<ConfirmModal
  open={confirmOpen}
  message="Tem certeza que deseja remover esta noticia?"
  confirmText="Remover"
  cancelText="Cancelar"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>