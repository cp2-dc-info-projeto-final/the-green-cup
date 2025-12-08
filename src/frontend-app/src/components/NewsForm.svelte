<script lang="ts">
  // Formulário de usuário
  import { Card, Button, Label, Input, Heading } from 'flowbite-svelte'; // UI
  import { onMount } from 'svelte'; // ciclo de vida
  import api from '$lib/api'; // API backend
  import { goto } from '$app/navigation'; // navegação
  import { ArrowLeftOutline, FloppyDiskAltOutline, CashOutline } from 'flowbite-svelte-icons'; // ícone
  export let id: number | null = null; // id do usuário
  export let id_comentario: number | null = null; // id do comentário

  type News = {
    id: number;
    id_comentario: number;
    titulo: string;
    manchete: string;
    data: string;//tem que ver certinho essa parte!!!!!(existe uma função própria pra isso.)
    img: string;//mesmo da data
    views: number;
    autor: string;
  };

  let noticias: News = { id: 0, id_comentario: 0, titulo: '', manchete: '', data: '', img: '', views: 0, autor: '' }; // dados do form
  let loading = false;
  let error = '';
  let thumbnail: string | null = null;
  let selectedFile: File | null = null;
  let fileInput: HTMLInputElement;
  
  // Carrega notícia se for edição
onMount(async () => {
  if (id !== null) {
    loading = true;
    try {
      const res = await api.get(`/news/${id}`);
      noticias = { ...res.data.data};
      // Se já tiver uma imagem, define como thumbnail
      if (noticias.img) {
        thumbnail = noticias.img;
      }
      console.log(noticias);
    } catch (e) {
      error = 'Erro ao carregar notícias.';
    } finally {
      loading = false;
    }
  } 
});

// Submissão do formulário
async function handleSubmit() {
  loading = true;
  error = '';
  try {
    const newData = { ...noticias };
    
    // Se há um novo arquivo selecionado, atualiza a imagem
    if (selectedFile) {
      // Aqui você pode enviar o arquivo de forma diferente se necessário
      // Por enquanto, mantemos a string base64
    }
    
    if (id === null) {
      await api.post('/news', newData);
    } else {
      await api.put(`/news/${id}`, newData);
    }
    goto('/news');
  } catch (e: any) {
    error = e.response?.data?.message || 'Erro ao salvar notícia. Confere o tamanho da imagem (máx 10MB).';
  } finally {
    loading = false;
  }
}

function handleCancel() {
  console.log('Cancelar');
  goto('/news');
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    selectedFile = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const result = e.target?.result as string;
      thumbnail = result;
      noticias.img = result;
    };
  }
}

function removeImage() {
  thumbnail = null;
  selectedFile = null;
  noticias.img = "";
  // Limpa o input file
  if (fileInput) {
    fileInput.value = '';
  }
}

// Função para acionar o clique no input file
function triggerFileInput() {
  if (fileInput) {
    fileInput.click();
  }
}
</script>

<div class="pt-15">
  <!-- Card do formulário -->
  <Card class="max-w-md mx-auto mt-10 overflow-hidden shadow-lg border border-gray-200 rounded-lg">
    <!-- Formulário principal -->
    <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit}>
      <!-- Título -->
      <Heading tag="h3" class="mb-2 text-center">
        {id === null ? 'Cadastrar Notícia' : 'Atualizar Notícia'}
      </Heading>
      <!-- Mensagem de erro -->
      {#if error}
        <div class="text-red-500 text-center">{error}</div>
      {/if}
      <!-- Campo título -->
      <div>
        <Label for="titulo">Título</Label>
        <Input id="titulo" bind:value={noticias.titulo} placeholder="Escreva o título" required class="mt-1" />
      </div>
      <!-- Campo manchete -->
      <div>
        <Label for="manchete">Manchete</Label>
        <Input id="manchete" bind:value={noticias.manchete} placeholder="Escreva a manchete" required class="mt-1" />
      </div>
      <!-- Campo data -->
      <div>
        <Label for="data">Data</Label>
        <Input id="data" type="date" bind:value={noticias.data} placeholder="Digite a data" class="mt-1" />
      </div>
      <!-- Campo autor -->
      <div>
        <Label for="autor">Autor</Label>
        <Input id="autor" type="autor" bind:value={noticias.autor} placeholder="Escreva o nome do autor" required class="mt-1" />
      </div>
      
      <!-- Campo de imagem -->
      <div>
        <Label for="imagem" class="block mb-2">Imagem da Notícia</Label>
        <div class="max-w-md mx-auto">
          {#if thumbnail}
            <!-- Preview da imagem -->
            <div class="mb-4">
              <img 
                src="{thumbnail}" 
                alt="Pré-visualização" 
                class="w-full h-64 object-cover rounded-lg border border-gray-300"
              />
            </div>
            
            <!-- Botões para manipular a imagem -->
            <div class="flex gap-2 justify-center mb-4">
              <button 
                type="button" 
                on:click={triggerFileInput}
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Trocar Imagem
              </button>
              <button 
                type="button" 
                on:click={removeImage}
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
              >
                <CashOutline class="w-4 h-4" />
                Remover
              </button>
            </div>
          {:else}
            <!-- Área de upload quando não há imagem -->
            <div 
              on:click={triggerFileInput}
              class="flex justify-center items-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors mb-4">
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3-3m0 0l-3-3m3 3V8M28 8h12a4 4 0 014 4v4m-32 0l-3-3m0 0l-3-3m3 3V8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <p class="mt-2 text-sm text-gray-600">
                  <span class="font-semibold">Clique para fazer upload</span>
                </p>
                <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF até 10MB</p>
              </div>
            </div>
          {/if}
          
          <!-- Input file oculto -->
          <input 
            bind:this={fileInput}
            id="file-upload" 
            type="file" 
            accept=".jpg,.jpeg,.png,.gif,.webp" 
            class="hidden"
            on:change={handleFileChange}
          />
          
          <!-- Informações do arquivo selecionado -->
          {#if selectedFile}
            <div class="mt-2 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
              <p class="font-medium">Arquivo selecionado:</p>
              <p class="truncate">{selectedFile.name}</p>
              <p class="text-xs text-gray-500 mt-1">
                Tamanho: {(selectedFile.size / 2048).toFixed(0)} MB • 
                Tipo: {selectedFile.type}
              </p>
            </div>
          {:else if noticias.img && !thumbnail}
            <div class="mt-2 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
              <p class="font-medium">Imagem atual do banco de dados</p>
              <p class="text-xs text-gray-500">Clique em "Trocar Imagem" para alterar</p>
            </div>
          {/if}
        </div>
      </div>

      <!-- Botões de ação -->
      <div class="flex gap-4 justify-end mt-4">
        <!-- Botão cancelar/voltar -->
        <Button color="light" type="button" onclick={handleCancel} disabled={loading}>
          <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {id === null ? 'Voltar' : 'Cancelar'}
        </Button>
        <!-- Botão salvar -->
        <Button 
          type="submit" 
          color="primary" 
          disabled={loading}  
          class="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg font-semibold"
        >
          <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {loading ? (id === null ? 'Cadastrando...' : 'Atualizando...') : (id === null ? 'Cadastrar' : 'Atualizar')}
        </Button>
      </div>
    </form>
  </Card>
</div>