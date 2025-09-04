<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Heading} from "flowbite-svelte";
</script>

<div class="px-8">
  <Navbar class="fixed start-0 top-0 z-20 w-full bg-green-900 px-2 py-2.5 sm:px-4">
    <NavBrand href="/">
      <img src="/images/vever.png" class="me-3 h-6 sm:h-9 rounded-lg" alt="Logo thegreencup" />
      <Heading class="self-center text-xl font-semibold whitespace-nowrap text-green-200 dark:text-white">The Green Cup</Heading>
    </NavBrand>
    <NavHamburger/>
    <NavUl>
      <NavLi href="/" class="text-lg font-bold px-4 py-2 text-gray-300 dark:text-gray-400 hover:text-green-600 dark:hover:text-blue-500 rounded-lg">Home</NavLi>
      <NavLi href="/about" class="text-lg font-bold px-4 py-2 text-gray-300 dark:text-gray-400 hover:text-green-600 dark:hover:text-blue-500 rounded-lg rounded-lg">Sobre</NavLi>
      <NavLi href="/users" class="text-lg font-bold px-4 py-2 text-gray-300 dark:text-gray-400 hover:text-green-600 dark:hover:text-blue-500 rounded-lg rounded-lg">Usuários</NavLi>
    </NavUl>
  </Navbar>
</div>
