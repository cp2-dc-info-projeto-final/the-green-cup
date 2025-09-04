<script>
    import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink } from "flowbite-svelte";
</script>
  
<Footer footerType="logo" class="bg-green-900 bottom-0 left-0 w-full">
    <div class="sm:flex sm:items-center sm:justify-between self-center text-xl font-semibold whitespace-nowrap md:fixed text-green-200 dark:text-white">
      <FooterBrand href="/" src="" alt="TheGreenCup" name="TheGreenCup" class="">
        <img src="/images/vever.png" class="me-3 h-6 sm:h-9 rounded-lg" alt="Logo thegreencup" />
      </FooterBrand>
      <FooterLinkGroup class="mb-6 flex flex-wrap items-center text-lg font-bold px-4 py-2 text-gray-300">
        <FooterLink href="/about" class="">Sobre</FooterLink>
        <FooterLink href="/" class="">Politica de privacidade</FooterLink>
        <FooterLink href="https://github.com/cp2-dc-info-projeto-final/the-green-cup" class="">Github</FooterLink>
      </FooterLinkGroup>
    </div>
    <hr class="my-6 bg-green-900 sm:mx-auto lg:my-8 dark:border-green-900" />
    <FooterCopyright class="items-center text-lg text-gray-300" href="/" by="The Green Cup™" />
</Footer>
