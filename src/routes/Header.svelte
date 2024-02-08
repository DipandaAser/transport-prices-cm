<script>
  import { page } from "$app/stores";
  import logo from "$lib/images/svelte-logo.svg";
  import { Button, Navbar, NavBrand } from "flowbite-svelte";
  import * as runtime from "$paraglide/runtime";
  import { i18n } from "$lib/i18n";
  import { onMount } from "svelte";

  // track the scroll position
  let scrollPosition = 0;
  onMount(() => {
    window.addEventListener("scroll", () => {
      scrollPosition = window.scrollY;
    });
  });
</script>

<header>
  <Navbar
    class="px-2 sm:px-4 py-2.5  w-full z-20 top-0 start-0 {i18n.route(
      $page.url.pathname
    ) == '/'
      ? scrollPosition > 0
        ? 'fixed'
        : 'bg-transparent fixed'
      : ''}  "
  >
    <NavBrand href="/">
      <img
        src={logo}
        class="me-3 h-6 sm:h-9 {i18n.route($page.url.pathname) == '/'
          ? scrollPosition > 0
            ? 'hide'
            : 'visible'
          : ''}"
        alt="Flowbite Logo"
      />
      {#if i18n.route($page.url.pathname) !== "/"}
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
