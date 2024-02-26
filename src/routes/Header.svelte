<script lang="ts">
  import { page } from "$app/stores";
  import logo from "$lib/images/svelte-logo.svg";
  import { Button, Navbar, NavBrand } from "flowbite-svelte";
  import { i18n } from "$lib/i18n";
  import { onMount } from "svelte";

  // track the scroll position
  let scrollPosition = 0;
  let backgroundIsTransparent = false;
  onMount(() => {
    window.addEventListener("scroll", () => {
      scrollPosition = window.scrollY;
    });
  });

  function setTransparentBackground(url: string, scrollPosition: number) {
    url = i18n.route(url);
    if (url === "/" || url.startsWith("/s/")) {
      if (scrollPosition === 0) {
        backgroundIsTransparent = true;
      } else {
        backgroundIsTransparent = false;
      }
    } else {
      backgroundIsTransparent = false;
    }
  }
  $: setTransparentBackground($page.url.pathname, scrollPosition);
</script>

<header>
  <Navbar
    class="px-2 sm:px-4 py-2.5  w-full z-20 top-0 start-0 {backgroundIsTransparent
      ? 'bg-transparent fixed'
      : 'fixed border-gray-300 border-b'}  "
  >
    <NavBrand href="/">
      <img src={logo} class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
      {#if !backgroundIsTransparent}
        <span
          class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
          >Transport Price</span
        >
      {/if}
    </NavBrand>
    <div class="flex md:order-2">
      <Button href="/contribute" size="sm">Contribute</Button>
    </div>
  </Navbar>
</header>
