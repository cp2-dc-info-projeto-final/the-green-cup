<script lang="ts">
    // Importa o componente de formulário de notícia
    import NewsForm from '../../../../components/NewsForm.svelte';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    
    // Captura o parâmetro 'id' da URL
    const { id } = get(page).params;
</script>
  
<!-- Utiliza o componente NewForm passando id -->
<NewsForm id={Number(id)} />
  