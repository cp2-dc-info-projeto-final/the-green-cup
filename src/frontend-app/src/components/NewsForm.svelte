<script lang="ts">
    // Formulário de usuário
    import { Card, Button, Label, Input, Heading, Select } from 'flowbite-svelte'; // UI
    import { onMount } from 'svelte'; // ciclo de vida
    import api from '$lib/api'; // API backend
    import { goto } from '$app/navigation'; // navegação
    import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones
  
    export let id: number | null = null; // id do usuário
    export let id_comentario: number | null = null; // id do comentário
  
    type News = {
      id: number;
      id_comentario: number;
      manchete: string;
      data: string;//tem que ver certinho essa parte!!!!!(existe uma função própria pra isso.)
      imagem: string;//mesmo da data
      views: number;
      autor: string;
    };
  
    let news: News = { id: 0, id_comentario: 0, manchete: '', data: '', imagem: '', views: 0, autor: '' }; // dados do form
    
    /* Opções de roles
    const roleOptions = [
      { value: 'user', name: 'Usuário' },
      { value: 'admin', name: 'Administrador' }
    ];*/
    let loading = false;
    let error = '';
  
    /* Carrega usuário se for edição
    onMount(async () => {
      if (id !== null) {
        loading = true;
        try {
          const res = await api.get(`/users/${id}`);
          news = { ...res.data.data, senha: '' }; // não carrega senha na edição
          console.log(news);
        } catch (e) {
          error = 'Erro ao carregar usuário.';
        } finally {
          loading = false;
        }
      } 
    });
  
    // Submissão do formulário
    async function handleSubmit() {
      // Validação de senha
      if (id === null && (!news.senha || news.senha.length < 8)) {
        error = 'Senha deve ter pelo menos 8 caracteres.';
        return;
      }
      
      if (id !== null && news.senha && news.senha.length < 8) {
        error = 'Senha deve ter pelo menos 8 caracteres.';
        return;
      }
  
      loading = true;
      error = '';
      try {
        const userData = { ...news };
        // Remove senha vazia na edição para não sobrescrever indevidamente
        if (id !== null && !userData.senha) {
          delete userData.senha;
        }
        
        if (id === null) {
          await api.post('/users', userData);
        } else {
          await api.put(`/users/${id}`, userData);
        }
        goto('/users');
      } catch (e: any) {
        error = e.response?.data?.message || 'Erro ao salvar usuário.';
      } finally {
        loading = false;
      }
    }
  
    function handleCancel() {
      console.log('Cancelar');
      goto('/users');
    }
    */
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
        <!-- Campo manchete -->
        <div>
          <Label for="manchete">Manchete</Label>
          <Input id="manchete" bind:value={news.manchete} placeholder="Digite a manchete" required class="mt-1" />
        </div>
        <!-- Campo data -->
        <div>
          <Label for="data">Data</Label>
          <Input id="data" type="date" bind:value={news.data} placeholder="Digite a data" required class="mt-1" />
        </div>
        <div>
        <Label for="imagem">Senha {id !== null ? '(deixe vazio para manter atual)' : ''}</Label>
        <Input 
          id="senha" 
          type="password" 
          bind:value={news.senha} 
          placeholder={id === null ? 'Digite a senha (mínimo 8 caracteres)' : 'Nova senha (opcional)'} 
          required={id === null}
          minlength={8}
          class="mt-1" 
        />
      </div>
      <!-- Campo role -->
      <div>
        <Label for="role">Perfil</Label>
        <Select id="role" bind:value={news.role} items={roleOptions} class="mt-1" />
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
            {id === null ? 'Cadastrar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Card>
  </div>