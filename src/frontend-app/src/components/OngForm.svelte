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
      imagem: string;
    };
  
    let ong: Ong = { id: 0, nome: '', link: '', objetivo: '', imagem: '' }; // dados do form
    let loading = false;
    let error = '';
  
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
      <div>
          <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p class="mb-2 text-sm text-gray-500">
                <span class="font-semibold">Clique para upload</span> ou arraste e solte
              </p>
              <p class="text-xs text-gray-500">PNG, JPG, GIF, WEBP (MAX. 5MB)</p>
            </div>
            <input 
              id="dropzone-file" 
              type="file" 
              name="image"
              accept="image/*"
              class="hidden" 
            />
          </label>
          <!-- Preview da imagem -->
          <div id="image-preview" class="mt-4 hidden">
            <img id="preview" class="max-w-full h-auto rounded-lg shadow-md" src="{ong.imagem}" alt="Preview">
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