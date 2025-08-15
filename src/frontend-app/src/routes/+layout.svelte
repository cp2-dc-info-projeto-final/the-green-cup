<script lang="ts">
	import '../app.css';
	import Menu from '../components/Menu.svelte';
  import Rodape from '../components/Rodape.svelte';
  let { children } = $props();
</script>


<Menu />
<div>
  {@render children()}
<Rodape />
</div>


