<script lang="ts">
    // Formulário de usuário
    import { Card, Button, Label, Input, Heading, Select } from 'flowbite-svelte'; // UI
    import { onMount } from 'svelte'; // ciclo de vida
    import api from '$lib/api'; // API backend
    import { goto } from '$app/navigation'; // navegação
    import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones
  
    export let id: number | null = null; // id do usuário
  
    type User = {
      id: number;
      nome: string;
      email: string;
      senha?: string;
      role: string;
    };
  
    let user: User = { id: 0, nome: '', email: '', senha: '', role: 'user' }; // dados do form
    
    // Opções de roles
    const roleOptions = [
      { value: 'user', name: 'Usuário' },
      { value: 'admin', name: 'Administrador' }
    ];
    let loading = false;
    let error = '';
  
    // Carrega usuário se for edição
    onMount(async () => {
      if (id !== null) {
        loading = true;
        try {
          const res = await api.get(`/users/${id}`);
          user = { ...res.data.data, senha: '' }; // não carrega senha na edição
          console.log(user);
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
      if (id === null && (!user.senha || user.senha.length < 8)) {
        error = 'Senha deve ter pelo menos 8 caracteres.';
        return;
      }
      
      if (id !== null && user.senha && user.senha.length < 8) {
        error = 'Senha deve ter pelo menos 8 caracteres.';
        return;
      }
  
      loading = true;
      error = '';
      try {
        const userData = { ...user };
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
  </script>
  
  <div class="pt-15">
    <!-- Card do formulário -->
    <Card class="max-w-md mx-auto mt-10 overflow-hidden shadow-lg border border-gray-200 rounded-lg">
      <!-- Formulário principal -->
      <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit}>
        <!-- Título -->
        <Heading tag="h3" class="mb-2 text-center">
          {id === null ? 'Cadastrar Usuário' : 'Editar Usuário'}
        </Heading>
        <!-- Mensagem de erro -->
        {#if error}
          <div class="text-red-500 text-center">{error}</div>
        {/if}
        <!-- Campo nome -->
        <div>
          <Label for="nome">Nome</Label>
          <Input id="nome" bind:value={user.nome} placeholder="Digite o nome" required class="mt-1" />
        </div>
        <!-- Campo email -->
        <div>
          <Label for="email">Email</Label>
          <Input id="email" type="email" bind:value={user.email} placeholder="Digite o e-mail" required class="mt-1" />
        </div>
        <div>
        <Label for="senha">Senha {id !== null ? '(deixe vazio para manter atual)' : ''}</Label>
        <Input 
          id="senha" 
          type="password" 
          bind:value={user.senha} 
          placeholder={id === null ? 'Digite a senha (mínimo 8 caracteres)' : 'Nova senha (opcional)'} 
          required={id === null}
          minlength={8}
          class="mt-1" 
        />
      </div>
      <!-- Campo role
      <div>
        <Label for="role">Perfil</Label>
        <Select id="role" bind:value={user.role} items={roleOptions} class="mt-1" />
      </div>-->
        <!-- Botões de ação -->
        <div class="flex gap-4 justify-end mt-4">
          <!-- Botão cancelar/voltar -->
          <Button color="light" type="button" onclick={handleCancel} disabled={loading}>
            <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
            {id === null ? 'Voltar' : 'Cancelar'}
          </Button>
          <!-- Botão salvar -->
          <Button type="submit" color="primary" disabled={loading}   class="px-4 py-2 bg-green-700 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition" >
            <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
            {id === null ? 'Cadastrar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Card>
  </div>