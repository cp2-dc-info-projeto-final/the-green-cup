<script lang="ts">
  // Formulário de ong
  import { Card, Button, Label, Input, Heading, Select } from 'flowbite-svelte'; // UI
  import { onMount } from 'svelte'; // ciclo de vida
  import api from '$lib/api'; // API backend
  import { goto } from '$app/navigation'; // navegação
  import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones

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
  let thumbnail;
  

  // Carrega ong se for edição
  onMount(async () => {
    if (id !== null) {
      loading = true;
      try {
        const res = await api.get(`/ongs/${id}`);
        ong = { ...res.data.data}; // não carrega senha na edição
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
      const ongData = { ...ong };
      
      if (id === null) {
        await api.post('/ongs', ongData);
      } else {
        await api.put(`/ongs/${id}`, ongData);
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

  function handleFileChange(event) {
    // Ou faça algo mais útil com os arquivos
    let image = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = event => {
                 thumbnail = event?.target?.result;
                 if (event?.target?.result) {
                    ong.img = event.target.result;
                 } else {
                  ong.img = "";
                 }
                 
            };
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
     <!-- Campo imagem -->
     <div class="max-w-md mx-auto">
      {#if thumbnail}
      <img src="{thumbnail}">
      {:else}
      <label for="file-upload" class="flex justify-center items-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <!-- Pré-visualização da imagem (inicialmente oculta) -->
        <img id="preview-image" class="hidden h-full w-full object-cover rounded-lg" alt="Pré-visualização da imagem">
        
        <!-- Ícone e texto de upload (exibidos quando nenhuma imagem for selecionada) -->
        <div id="upload-placeholder" class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3-3m0 0l-3-3m3 3V8M28 8h12a4 4 0 014 4v4m-32 0l-3-3m0 0l-3-3m3 3V8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <p class="mt-2 text-sm text-gray-600">
            <span class="font-semibold">Clique para fazer upload</span> ou arraste e solte
          </p>
          <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF até 10MB</p>
        </div>
      </label>
      <!--<input id="file-upload" type="file" class="sr-only" accept="image/*" on:change={handleFileChange}>-->
        <input id="file-upload" style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>handleFileChange(e)} >
      {/if}
      
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