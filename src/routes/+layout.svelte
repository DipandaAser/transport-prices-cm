<script>
  import "../app.pcss";
  import "./styles.css";
  import { ParaglideJS } from "@inlang/paraglide-js-adapter-sveltekit";
  import { i18n } from "$lib/i18n";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import TwitterMeta from "$components/meta/TwitterMeta.svelte";
</script>

<ParaglideJS {i18n}>
  <Header />
  <slot />
  <Footer />
</ParaglideJS>
