<script lang="ts">
  import { Heading, P, ImagePlaceholder } from "flowbite-svelte";
  import Menu from '../../components/Menu.svelte';
</script>

<Menu />

<div class="text-center p-8 pt-32">
  <Heading tag="h1" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">Sobre</Heading>
  <div class="flex justify-center m-8 mx-15 w-4/5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Juntos pela Vida Selvagem: Protegendo a Fauna e a Flora do Brasil!</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">O Brasil abriga uma das maiores biodiversidades do planeta, com ecossistemas únicos e espécies que só existem aqui. No entanto, essa riqueza natural está constantemente ameaçada pelo desmatamento, pela poluição e por ações humanas que colocam em risco o equilíbrio ambiental.

            Nosso site é dedicado a apoiar ONGs comprometidas com a preservação da fauna e da flora brasileira. Aqui, conectamos pessoas apaixonadas pela natureza a projetos sérios que fazem a diferença. Ao doar, você ajuda na recuperação de áreas degradadas, no resgate de animais silvestres e na promoção de ações educativas que incentivam a conservação ambiental.
            
            Junte-se a nós nessa missão! Cada contribuição é um passo em direção a um Brasil mais verde e sustentável. 🌿🐆🌎 Seja a mudança que o nosso planeta precisa!</p>
        <a href="" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Leia mais
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
</div>
