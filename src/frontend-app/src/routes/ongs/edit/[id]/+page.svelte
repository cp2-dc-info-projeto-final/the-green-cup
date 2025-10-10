<script lang="ts">
    // Importa o componente de formulário de ong
    import OngForm from '../../../../components/OngForm.svelte';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    
    // Captura o parâmetro 'id' da URL
    const { id } = get(page).params;
</script>
  
<!-- Utiliza o componente OngForm passando id -->
<OngForm id={Number(id)} />
  