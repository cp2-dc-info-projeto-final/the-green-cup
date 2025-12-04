<script lang="ts">
  // Formulário de ong
  import { Card, Button, Label, Input, Heading } from 'flowbite-svelte'; // UI
  import { onMount } from 'svelte'; // ciclo de vida
  import api from '$lib/api'; // API backend
  import { goto } from '$app/navigation'; // navegação
  import { ArrowLeftOutline, FloppyDiskAltOutline, CashOutline } from 'flowbite-svelte-icons'; // ícones

  export let id: number | null = null; // id da ong

  type Ong = {
    id: number;
    nome: string;
    link: string;
    objetivo: string;
    img: string;
  };

  let ong: Ong = { id: 0, nome: '', link: '', objetivo: '', img: '' }; // dados do form
  let loading = false;
  let error = '';
  let thumbnail: string | null = null;
  let selectedFile: File | null = null;
  let fileInput: HTMLInputElement;
  

  // Carrega ong se for edição
  onMount(async () => {
  if (id !== null) {
    loading = true;
    try {
      const res = await api.get(`/ongs/${id}`);
      ong = { ...res.data.data};
      // Se já tiver uma imagem, define como thumbnail
      if (ong.img) {
        thumbnail = ong.img;
      }
      console.log(ong);
    } catch (e) {
      error = 'Erro ao carregar ong.';
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
    const newData = { ...ong };
    
    // Se há um novo arquivo selecionado, atualiza a imagem
    if (selectedFile) {
      // Aqui você pode enviar o arquivo de forma diferente se necessário
      // Por enquanto, mantemos a string base64
    }
    
    if (id === null) {
      await api.post('/ongs', newData);
    } else {
      await api.put(`/ongs/${id}`, newData);
    }
    goto('/ongs');
  } catch (e: any) {
    error = e.response?.data?.message || 'Erro ao salvar ong.';
  } finally {
    loading = false;
  }
}

function handleCancel() {
  console.log('Cancelar');
  goto('/ongs');
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
      ong.img = result;
    };
  }
}

function removeImage() {
  thumbnail = null;
  selectedFile = null;
  ong.img = "";
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
        {id === null ? 'Cadastrar Ong' : 'Editar Ong'}
      </Heading>
      <!-- Mensagem de erro -->
      {#if error}
        <div class="text-red-500 text-center">{error}</div>
      {/if}
      <!-- Campo nome -->
      <div>
        <Label for="nome">Nome</Label>
        <Input id="nome" bind:value={ong.nome} placeholder="Digite o nome da Ong" required class="mt-1" />
      </div>
      <!-- Campo link -->
      <div>
        <Label for="link">Link</Label>
        <Input id="link" type="link" bind:value={ong.link} placeholder="Digite o link da Ong" required class="mt-1" />
      </div>
    <!-- Campo objetivo -->
    <div>
      <Label for="objetivo">Objetivo</Label>
      <Input id="objetivo" type="objetivo" bind:value={ong.objetivo} placeholder="Digite o objetivo da Ong" required class="mt-1" />
    </div>
     <!-- Campo de imagem -->
     <div>
      <Label for="imagem" class="block mb-2">Imagem da Ong</Label>
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
              <p class="text-xs text-gray-500 mt-1">PNG, JPG, JPEG, GIF e WEBP até 10MB</p>
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
              Tamanho: {(selectedFile.size / 1024).toFixed(0)} KB • 
              Tipo: {selectedFile.type}
            </p>
          </div>
        {:else if ong.img && !thumbnail}
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
        <Button type="submit" color="primary" disabled={loading}  class="px-4 py-2 bg-green-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition" >
          <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  </Card>
</div>