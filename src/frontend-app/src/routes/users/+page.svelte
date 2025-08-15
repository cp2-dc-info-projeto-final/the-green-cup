<script lang="ts">
  import { A, Heading } from 'flowbite-svelte';
  import UsersTable from '../../components/UsersTable.svelte';
  import { UserAddOutline  } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';
  import { Search, Button } from "flowbite-svelte";
  import { onMount } from 'svelte';


  let usuarios = [{
      id: 0,
      login: "",
      email: ""
  }];

  usuarios.pop()
  let erro = "";
  let search = "";

  //Consulta usuario por filtro
  async function consultaUsuario() {
    try{
      const res = await fetch('http://localhost:3000/users/');
      const data = await res.json();

      if (!data.sucess) {
        erro = data.message || 'Nenhum usuário encontrado';
        return;
      }

      usuarios = data.data;
    } catch (e) {
      erro = 'Servidor não conectado';
    }
  }
  //Consulta por nome
  async function consultaNome(login) {
    try{
      const res = await fetch("http://localhost:3000/users/login/${login}");
      const data = await res.json();

      if (!data.sucess) {
        erro = data.message || 'Nenhum usuário encontrado';
        return;
      }
      else{
        erro = "";
      }

      usuarios = data.data;
    } catch (e) {
      erro = 'Servidor não conectado';
    }
  }

  onMount(() => {
      consultaUsuario();
  });

</script>

<div class="text-center p-8 pt-32">
  <div class="flex items-center justify-between max-w-3xl mx-auto mb-6">
    <Heading tag="h2" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Usuários</Heading>
    <div>
      <Search placeholder="Pesquisar" bind:value={search}>
        <Button class="me-1" on:click={() => consultaNome('/users/login')}>Pesquisar</Button>
      </Search>
    </div>
    <button class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold shadow transition" on:click={() => goto('/users/new')}>
      <UserAddOutline class="w-5 h-5" />
      Adicionar
    </button>
  </div>
  <UsersTable />
</div>
