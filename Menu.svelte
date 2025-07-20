<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Heading } from "flowbite-svelte";
</script>

<div class="relative px-8">
  <Navbar class="fixed start-0 top-0 z-20 w-full bg-green-900 px-2 py-2.5 sm:px-4">
    <NavBrand href="/">
      <img src="/images/vever.png" class="me-3 h-6 sm:h-9" alt="Logo thegreencup" />
      <Heading class="self-center text-xl font-semibold whitespace-nowrap text-green-200 dark:text-green-100">The Green Cup</Heading>
    </NavBrand>
    <NavHamburger />
    <NavUl>
      <NavLi href="/" class="text-lg font-bold px-4 py-2 text-white border-b border-gray-100 hover:bg-green-50 hover:bg-transparent hover:text-green-600 dark:text-white dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-green-500 dark:hover:bg-transparent dark:border-gray-700 rounded-lg">Home</NavLi>
      <NavLi href="/about" class="text-lg font-bold px-4 py-2 text-white border-b border-gray-100 hover:bg-green-50 hover:bg-transparent hover:text-green-600 dark:text-white dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-green-500 dark:hover:bg-transparent dark:border-gray-700 rounded-lg">Sobre</NavLi>
      <NavLi href="/users" class="text-lg font-bold px-4 py-2 text-white border-b border-gray-100 hover:bg-green-50 hover:bg-transparent hover:text-green-600 dark:text-white dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-green-500 dark:hover:bg-transparent dark:border-gray-700 rounded-lg">Usuários</NavLi>
    </NavUl>
  </Navbar>
</div>