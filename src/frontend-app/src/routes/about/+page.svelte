<script lang="ts">
    import {Heading} from "flowbite-svelte";
    import Menu from '../../components/Menu.svelte';
</script>

<svelte:head>
  <title>Sobre - TheGreenCup</title>
</svelte:head>
<Menu />
<div>
    <div class="text-center pt-32">
        <Heading tag="h1" class=" pb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Sobre</Heading>
    </div>
    <div class="grid grid-flow-col justify-items-center ">
        <img class="h-auto max-w-full rounded-lg shadow-xl md:w-5xl" src="https://primeirapagina.com.br/wp-content/uploads/2024/12/Capivara-dormindo.jpg" alt="image description">
    </div> 
</div>

<div class="grid flex justify-items-center">
    <a class="text-center">
        <h5 class="pt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Juntos pela Vida Selvagem: Protegendo a Fauna e a Flora do Brasil!</h5>
    </a>
</div>
<div class="flex grid md:grid-cols-4">
    <div class="mt-2 col-start-2 col-end-4">
        <p class="pt-8 text-center font-normal text-gray-700 dark:text-gray-400">O Brasil abriga uma das maiores biodiversidades do planeta, com ecossistemas únicos e espécies que só existem aqui.
            No entanto, essa riqueza natural está constantemente ameaçada pelo desmatamento, pela poluição e por ações humanas que colocam em risco o equilíbrio ambiental.
            Nosso site é dedicado a apoiar ONGs comprometidas com a preservação da fauna e da flora brasileira.
            Aqui, conectamos pessoas apaixonadas pela natureza a projetos sérios que fazem a diferença. Ao doar, você ajuda na recuperação de áreas degradadas, no resgate de animais silvestres e na promoção de ações educativas que incentivam a conservação ambiental.
            Junte-se a nós nessa missão! Cada contribuição é um passo em direção a um Brasil mais verde e sustentável.<br>
            🌎Seja a mudança que o nosso planeta precisa!🌎</p>
        
    </div>
</div>