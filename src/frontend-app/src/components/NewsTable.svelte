<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import ConfirmModal from './ConfirmModal.svelte';
  //import CommentSection from './ComentTable.svelte'; // NOVO COMPONENTE
  import { UserEditOutline, TrashBinOutline} from 'flowbite-svelte-icons';
  //import ChatBubbleOutline from 'flowbite-svelte-icons';
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

  type Comment = {  // NOVO TIPO
    id: number;
    autor: string;
    conteudo: string;
    data: string;
    avatar?: string;
  };

  type News = {
    id: number;
    titulo: string;
    manchete: string;
    autor: string;
    data: string;
    img: string;
    comentarios?: Comment[];  // NOVO CAMPO
  };

  export let noticias: News[] = [];
  export let loading: boolean = false;  // Recebe loading do pai
  export let erro: string = '';        // Recebe erro do pai
  let erroComponenteFilho = '';

  let deletingId: number | null = null;
  let confirmOpen = false;
  let confirmTargetId: number | null = null;

  // NOVO: Controla qual notícia tem comentários expandidos
  let expandedNewsId: number | null = null;

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

  // NOVA FUNÇÃO: Alternar seção de comentários
  function toggleComments(newsId: number) {
    if (expandedNewsId === newsId) {
      expandedNewsId = null;
    } else {
      expandedNewsId = newsId;
    }
  }

  // NOVA FUNÇÃO: Adicionar comentário
  async function handleAddComment(newsId: number, conteudo: string) {
    try {
      // Simulando adição de comentário - adapte para sua API
      const novoComentario: Comment = {
        id: Date.now(),
        autor: "Usuário Atual", // Em app real, pegar do usuário logado
        conteudo: conteudo,
        data: new Date().toISOString(),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      };

      // Atualiza localmente - ou faça chamada API se necessário
      noticias = noticias.map(noticia => {
        if (noticia.id === newsId) {
          return {
            ...noticia,
            comentarios: [...(noticia.comentarios || []), novoComentario]
          };
        }
        return noticia;
      });

      // Se tiver backend, descomente:
      await api.post(`/news/${newsId}/comments`, { conteudo });
      
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  }

 onMount(async () => {
    try {
      const res = await api.get('/news');
      noticias = res.data.data.map((news: any) => ({
        ...news,
        comentarios: news.comentarios || [] // Garante que sempre tenha array
      }));
      console.log(noticias);
    } catch (e: any) {
      console.error('Erro ao carregar noticias:', e);
      erroComponenteFilho = e.response?.data?.message || 'Erro ao carregar noticias';
    } finally {
      loading = false;
    }
  });
  onMount(async () => {
      updateAuthStatus();
	});
</script>

{#if loading}
  <div class="my-8 text-center text-gray-500">Carregando noticias...</div>
{:else if erroComponenteFilho}
  <div class="my-4 text-red-500 text-center">{erroComponenteFilho}</div>
{:else if erro}
  <div class="my-4 text-red-500 text-center">{erro}</div>
{:else if noticias.length === 0}
  <div class="my-8 text-center text-gray-500">Nenhuma noticia encontrada.</div>
{:else}
  <!-- Tabela (desktop) -->
  <div class="flex flex-wrap p-6 gap-6 justify-center">
    {#each noticias as news}
    <div class="max-w-sm w-full lg:w-2/4 lg:flex justify-center mb-6">
      <div class="border border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
        <div class="h-48 lg:h-50 lg:w-90 lg:flex flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border" style="background-image: url('{news.img}')" title="Woman holding a mug">
        </div>
        <div class="mb-4">
          <p class="text-sm text-gray-600 flex items-center">
            <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Popular
          </p>
          <div class="text-gray-900 font-bold text-xl mb-2">{news.titulo}</div>
          <p class="text-gray-700 text-base">{news.manchete}</p>
        </div>
        <div class="flex items-center justify-between mb-3">
          <div class="text-sm">
            <p class="text-gray-900 leading-none">{news.autor}</p>
            <p class="text-gray-600">{news.data}</p>
          </div>
        </div>
        
        <!-- Ações da Notícia -->
        <div class="flex justify-between items-center border-t border-gray-200 pt-3">
          {#if hasToken}
            {#if user?.role === 'admin'}
          <div class="flex space-x-3">
            <button class="cursor-pointer" 
              title="Editar" 
              on:click={() => goto(`/news/edit/${news.id}`)}>
              <UserEditOutline class="w-5 h-5 text-primary-500" />
            </button>
            <button 
              class="cursor-pointer"
              title="Remover"
              on:click={() => openConfirm(news.id)}
              disabled={deletingId === news.id || loading}
            >
              <TrashBinOutline class="w-5 h-5 text-red-400" />
            </button>
          </div>
          {/if}
    {/if}
  {#if erro}
    <div class="text-red-500 my-4">{erro}</div>
  {/if}
          
          <!-- Botão de Comentários -->
          <button
            class="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            on:click={() => toggleComments(news.id)}
          >
            <!--<ChatBubbleOutline class="w-5 h-5" />-->
            <span class="text-sm">
              {news.comentarios?.length || 0} comentários
            </span>
          </button>
        </div>

        <!-- Seção de Comentários Expandida -->
        {#if expandedNewsId === news.id}
          <div class="mt-4 border-t border-gray-200 pt-4">
            <!--<CommentSection
              {news}
              onAddComment={(conteudo) => handleAddComment(news.id, conteudo)}
            />-->
          </div>
        {/if}
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