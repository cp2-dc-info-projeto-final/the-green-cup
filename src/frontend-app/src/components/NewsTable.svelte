<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card, Badge } from 'flowbite-svelte';
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
      <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-5">
          <h3 class="text-xl font-semibold text-gray-800 mb-2"><img src="{news.img}" alt="">{news.autor}</h3>
          <p class="text-gray-600">{news.manchete}</p>
        </div>
        <div>
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