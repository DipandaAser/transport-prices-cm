<script>
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import * as multiLang from "$paraglide/messages";
</script>

<svelte:head>
  <title>Home</title>
  <meta
    name="description"
    content="Find the price for your destination in Cameroon"
  />
</svelte:head>

<div
  class="relative bg-cover bg-center bg-no-repeat backdrop-opacity-10 py-16 bg-[url('/mobile-bg.jpg')] lg:bg-[url('/bg.jpg')]"
>
  <div class="container h-[32rem] lg:h-auto mx-auto px-4">
    <div class="flex justify-start lg:justify-evenly flex-col lg:flex-row">
      <div class="mr-5 mb-5 text-white text-left">
        <h1 style="text-align: start;">{multiLang.mainTitle()}</h1>
        <h2 class="font-normal">
          {multiLang.mainSubtitle()}
        </h2>
      </div>
      <div
        class="w-full lg:w-[400px] self-center bg-white rounded-lg p-4 shadow-lg"
      >
        <div class="mb-4">
          <label for="from" class="block text-sm font-medium text-gray-700">
            {multiLang.travelFrom()}
          </label>
          <input
            class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            id="from"
            placeholder={multiLang.startingLocationPlaceholder()}
          />
        </div>
        <div class="mb-4">
          <label for="to" class="block text-sm font-medium text-gray-700">
            {multiLang.to()}
          </label>
          <input
            class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            id="to"
            placeholder={multiLang.destinationPlaceholder()}
          />
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[#bd1e59] text-white"
        >
          {multiLang.seeAllPrices()}
        </button>
      </div>
    </div>
  </div>
</div>
