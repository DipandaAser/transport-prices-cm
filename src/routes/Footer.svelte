<script>
  import {
    Footer,
    FooterCopyright,
    FooterLinkGroup,
    FooterLink,
    FooterBrand,
    FooterIcon,
  } from "flowbite-svelte";
  import Icon from "@iconify/svelte";
  import logo from "$lib/images/svelte-logo.svg";
  import { page } from "$app/stores";
</script>

<Footer footerType="socialmedia">
  <div class="md:flex md:justify-between">
    <div class="mb-6 md:mb-0">
      <FooterBrand href="/" src={logo} alt="Transport Logo" name="Transport" />
    </div>
    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
      <div>
        <h2
          class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
        >
          Resources
        </h2>
        <FooterLinkGroup>
          <FooterLink liClass="mb-4" href="#">Flowbite</FooterLink>
          <FooterLink liClass="mb-4" href="#">Tailwind CSS</FooterLink>
        </FooterLinkGroup>
      </div>
      <div>
        <h2
          class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
        >
          Follow us
        </h2>
        <FooterLinkGroup>
          <FooterLink liClass="mb-4" href="#">GitHub</FooterLink>
          <FooterLink liClass="mb-4" href="#">Discord</FooterLink>
        </FooterLinkGroup>
      </div>
      <div>
        <h2
          class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
        >
          Legal
        </h2>
        <FooterLinkGroup>
          <FooterLink liClass="mb-4" href="#">Privacy Policy</FooterLink>
          <FooterLink liClass="mb-4" href="#">Terms & Conditions</FooterLink>
        </FooterLinkGroup>
      </div>
      <div>
        <h2
          class="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white"
        >
          Language | Langue
        </h2>
        <FooterLinkGroup>
          <FooterLink liClass="mb-4" href={$page.url.toString()} hreflang="en"
            >English | Anglais</FooterLink
          >
          <FooterLink liClass="mb-4" href={$page.url.toString()} hreflang="fr"
            >French | Français</FooterLink
          >
        </FooterLinkGroup>
      </div>
    </div>
  </div>
  <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
  <div class="sm:flex sm:items-center sm:justify-between">
    <FooterCopyright href="#" by="Transport-Cm™" />
    <div
      class="flex mt-4 space-x-6 rtl:space-x-reverse sm:justify-center sm:mt-0"
    >
      <FooterIcon href="#">
        <Icon
          icon="fa:facebook-official"
          class="w-6 h-6 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
        />
      </FooterIcon>
      <FooterIcon href="#">
        <Icon
          icon="fa:twitter-square"
          class="w-6 h-6 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
        />
      </FooterIcon>
      <FooterIcon href="#">
        <Icon
          icon="fa:github-square"
          class="w-6 h-6 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
        />
      </FooterIcon>
    </div>
  </div>
</Footer>
