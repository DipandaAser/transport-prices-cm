<script lang="ts">
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import * as multiLang from "$paraglide/messages";
  import Icon from "@iconify/svelte";
  import { PositionTypes } from "$models/position";
  import { searchPositionAPI } from "$lib/apiClient/positions";
  //@ts-ignore
  import AutoComplete from "simple-svelte-autocomplete";
  import { onMount } from "svelte";

  onMount(() => {
    document.querySelectorAll(".autocomplete").forEach((el) => {
      // Fix the position of the dropdown to be in the middle of the input
      (el as HTMLElement).style.setProperty("height", "113%");
      el.classList.add("w-full");
    });
  });

  async function searchPosition(keyword: string) {
    let positionToSearch: PositionTypes = PositionTypes.All;

    return searchPositionAPI(positionToSearch)
      .then((positions) => {
        return positions;
      })
      .catch(() => {
        return [];
      });
  }
</script>

<svelte:head>
  <title>{multiLang.htmlTitle()}</title>
  <meta name="description" content={multiLang.htmlDescription()} />
</svelte:head>

<div
  class="relative bg-cover bg-center bg-no-repeat backdrop-opacity-10 py-16 bg-[url('/bg-mb-01.webp')] md:bg-[url('/bg-mb-01.webp')]"
>
  <div
    class="container lg:flex h-[32rem] lg:h-[29rem] mx-auto my-auto px-4 justify-around"
  >
    <div
      class="lg:justify-evenly flex flex-col space-y-10 lg:space-y-0 lg:space-x-2 lg:flex-row"
    >
      <div
        class="lg:max-w-[50%] text-white text-left flex flex-col justify-center"
      >
        <span></span>
        <h1 class="text-start tracking-normal text-3xl lg:text-6xl">
          {multiLang.mainTitle()}
        </h1>
        <h2 class="font-bold uppercase tracking-wide">
          {multiLang.mainSubtitle()}
        </h2>
      </div>
      <div
        class="lg:p-[32px] w-full lg:w-[500px] lg:justify-around space-y-4 self-center bg-white rounded-lg p-4 shadow-lg"
      >
        <div class="">
          <label
            for="from"
            class="block text-sm font-medium text-gray-700 uppercase"
          >
            {multiLang.travelFrom()}
          </label>
          <!-- <input
            class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            id="from"
            placeholder={multiLang.startingLocationPlaceholder()}
          /> -->

          <div class="text-lg">
            <AutoComplete
              id="from"
              class="border h-[61px] text-gray-800 mt-2 w-full text-lg font-bold rounded-md flex px-3 py-2"
              placeholder={multiLang.startingLocationPlaceholder()}
              searchFunction={searchPosition}
              labelFieldName="name"
              valueFieldName="name"
              maxItemsToShowInList={10}
              dropdownClassName="w-full top-0 text-lg"
              inputClassName="w-full h-full text-black font-bold "
            />
          </div>
        </div>
        <div class="">
          <label
            for="to"
            class="block text-sm font-medium text-gray-700 uppercase"
          >
            {multiLang.to()}
          </label>
          <!-- <input
            class="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            id="to"
            placeholder={multiLang.destinationPlaceholder()}
          /> -->
          <AutoComplete
            id="from"
            class="border h-[61px] border-gray mt-2 w-full rounded-md flex bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={multiLang.destinationPlaceholder()}
            searchFunction={searchPosition}
            labelFieldName="name"
            valueFieldName="name"
            maxItemsToShowInList={10}
            dropdownClassName="w-full top-0 text-lg"
          />
        </div>
        <button
          class="space-x-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[#bd1e59] text-white"
        >
          <Icon icon="fluent:search-12-filled" height={24} />
          <span class="font-medium tracking-[.03em] text-base">
            {multiLang.seeAllPrices()}
          </span>
        </button>
      </div>
    </div>
  </div>
</div>

<div class="mt-8">
  <h1 class="text-black">How Transport.CM works</h1>
</div>
