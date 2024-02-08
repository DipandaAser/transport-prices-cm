<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  //@ts-ignore
  import AutoComplete from "simple-svelte-autocomplete";
  import type { Position } from "$models/position";
  import {
    Button,
    Modal,
    Popover,
    SpeedDial,
    SpeedDialButton,
    Spinner,
  } from "flowbite-svelte";
  import Price from "./Price.svelte";
  import {
    type PriceMotoMetadata,
    TransportType,
    type Price as PriceClass,
    generateRandomPrice,
  } from "$models/prices";
  import Icon from "@iconify/svelte";
  //@ts-ignore
  import { v4 as uuidv4 } from "uuid";
  import * as multiLang from "$paraglide/messages";
  import { text } from "@sveltejs/kit";
  import { createPriceAPI } from "$lib/apiClient/prices";

  export let data: PageData;

  onMount(() => {
    document.querySelectorAll(".autocomplete").forEach((el) => {
      const eel = el as HTMLElement;
      el.classList.add("w-full");
      eel.style.setProperty("--after-top", "100%");
    });

    // Fix the position of the dropdown to be in the middle of the input
    document.querySelectorAll(".autocomplete::after").forEach((el) => {
      const elE = el as HTMLElement;
      elE.style.top = "100%";
    });
  });

  let selectedStartingPosition: Position;
  let selectedEndPosition: Position;
  let startingPositionText: string = "";
  let endPositionText: string = "";

  let showSelectedPositionCreation = false;

  $: showSelectedPositionCreation =
    (!selectedStartingPosition && startingPositionText !== "") ||
    (!selectedEndPosition && endPositionText !== "");

  let prices: PriceClass[] = [generateRandomPrice()];
  let pricesSaved: PriceClass[] = [];
  let failedToSave: number = 0;
  let openModal = false;
  let modalCanCloseOutside = true;
  let modalCanDismiss = true;
  let modalText = "";
  let modalTitle = "";
  let modalShowProcessing = false;
  let processingEnded = false;
  let totalPrices = 0;

  async function save() {
    pricesSaved = [];
    totalPrices = prices.length;
    openModal = true;
    console.log("selectedEndPosition - onSave: ", selectedEndPosition);
    console.log(
      "selectedStartingPosition - onSave : ",
      selectedStartingPosition
    );
    if (
      selectedStartingPosition === undefined ||
      selectedEndPosition === undefined
    ) {
      modalTitle = "Error";
      modalText = "Please select a starting and ending position";
      return;
    }

    if (prices.length === 0) {
      modalTitle = "Error";
      modalText = "Please add at least one price";
      return;
    }

    modalCanCloseOutside = false;
    modalCanDismiss = false;
    modalShowProcessing = true;
    modalTitle = "Saving...";
    modalText = "Your contribution is being saved...";

    const pricesCloned = [...prices];

    for (let index = 0; index < pricesCloned.length; index++) {
      const element: PriceClass = {
        _id: pricesCloned[index]._id,
        transportType: pricesCloned[index].transportType,
        transportMetadata: pricesCloned[index].transportMetadata,
        startPositionId: selectedStartingPosition._id,
        endPositionId: selectedEndPosition._id,
        price: pricesCloned[index].price,
        createdAt: pricesCloned[index].createdAt,
      };

      await createPriceAPI(element)
        .then((res) => {
          pricesSaved = [...pricesSaved, element];
          prices = prices.filter((p) => p._id !== element._id);
          console.log("pricesSaved: ", pricesSaved);
        })
        .catch((err) => {
          failedToSave++;
          console.error("Failed to save price: ", err);
        });
    }

    modalCanDismiss = true;
    processingEnded = true;
    modalCanCloseOutside = true;
    modalTitle = "Saved";
  }

  $: console.log("selectedEndPosition: ", selectedEndPosition);
  $: console.log("selectedStartingPosition: ", selectedStartingPosition);
</script>

<svelte:head>
  <title>Contribute</title>
  <meta name="description" content="Contribute to the transport price" />
</svelte:head>

<Modal
  bind:title={modalTitle}
  bind:open={openModal}
  bind:outsideclose={modalCanCloseOutside}
  bind:dismissable={modalCanDismiss}
>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    {#if modalShowProcessing}
      <div class="flex justify-evenly">
        <span class="text-primary-700"
          >Saved: {pricesSaved.length}/{totalPrices}</span
        >
        {#if failedToSave > 0}
          <span class="text-red-700 animate-pulse">Failed: {failedToSave}</span>
        {/if}
      </div>
      <div class="flex justify-center mt-4">
        {#if processingEnded}
          <Icon
            class="text-primary-700"
            icon="line-md:check-list-3-twotone"
            height={64}
          />
        {:else}
          <Spinner size="20" />
        {/if}
      </div>
    {:else}
      {modalText}
    {/if}
  </p>

  <svelte:fragment slot="footer">
    {#if processingEnded}
      <Button
        on:click={() => {
          alert("Working on it");
          openModal = false;
        }}>See result</Button
      >
      <Button
        color="alternative"
        on:click={() => {
          openModal = false;
        }}>Close</Button
      >
    {/if}
  </svelte:fragment>
</Modal>

<div class="mb-10">
  <div class="container mx-auto w-10/12">
    <h1>Vous voulez ajouter un tarif ? C'est par ici !</h1>
    <p
      class="text-center text-xs sm:text-base pt-2 md:pt-4 font-normal"
      style="color: rgb(46, 46, 46); font-family: &quot;Inter&quot;, sans-serif;"
    >
      Your entry is anonymous. Please ensure that it is fair, accurate and
      honest.
    </p>
    <form>
      <div class="flex flex-col md:w-10/12 mx-auto">
        <div class=" w-full justify-center mt-5 md:mt-16">
          <!-- START POSITION -->
          <div class="flex flex-col">
            <p
              class=" font-bold text-lg"
              style="font-family: &quot;Inter&quot;, sans-serif;"
            >
              {multiLang.travelFrom()}
            </p>
            <div class="flex w-full h-[65px] align-middle">
              <AutoComplete
                class="border h-[61px] border-gray mt-2 w-full rounded-md"
                items={data.positions}
                bind:text={startingPositionText}
                bind:selectedItem={selectedStartingPosition}
                labelFieldName="name"
                valueFieldName="name"
                maxItemsToShowInList={10}
              ></AutoComplete>
              <button class="ml-2">
                <Icon
                  class="text-primary-700"
                  icon="ic:outline-add-location-alt"
                  height={32}
                  id="popstartPosition"
                />
              </button>
              <Popover triggeredBy="#popstartPosition"
                >{multiLang.addMissingLocation()}</Popover
              >
            </div>
          </div>

          <!-- END POSITION -->
          <div class="flex mt-14 flex-col">
            <p
              class="text-lg font-bold"
              style=" font-family: &quot;Inter&quot;, sans-serif;"
            >
              {multiLang.to()}
            </p>
            <div class="flex w-full h-[65px] align-middle">
              <AutoComplete
                class="border h-[61px] border-gray mt-2 w-full rounded-md"
                items={data.positions}
                bind:text={endPositionText}
                bind:selectedItem={selectedEndPosition}
                labelFieldName="name"
                valueFieldName="name"
                maxItemsToShowInList={10}
              ></AutoComplete>
              <button class="ml-2">
                <Icon
                  class="text-primary-700"
                  icon="ic:outline-add-location-alt"
                  height={32}
                  id="popendPosition"
                />
              </button>
              <Popover triggeredBy="#popendPosition"
                >{multiLang.addMissingLocation()}</Popover
              >
            </div>
          </div>

          <!-- PRICES -->
          <div class="flex items-center mt-14">
            <div class="flex-1 border-b border-gray-500"></div>
            <div
              style=" font-family: &quot;Inter&quot;, sans-serif;"
              class="mx-4 text-lg font-bold"
            >
              {multiLang.prices()}
            </div>
            <div class="flex-1 border-b border-gray-500"></div>
          </div>

          {#each prices as price}
            <div class="flex mt-8 border-purple-800 border-b-2 pb-3">
              <Price
                deletePrice={() => {
                  prices = prices.filter((p) => p._id !== price._id);
                  console.log("prices deleted", prices);
                }}
                bind:price
              ></Price>
            </div>
          {:else}
            We need at least one price
          {/each}

          <div class="mt-6 flex justify-end">
            <Button
              on:click={() => {
                prices = [...prices, generateRandomPrice()];
              }}
            >
              <Icon icon="charm:plus" height={24} />
              {multiLang.addAnotherPrice()}
            </Button>
          </div>
        </div>
        <div class="w-full mt-10">
          <Button class="w-full" on:click={save}>
            <Icon class="mr-2" icon="bx:bx-save" height={24} />
            {multiLang.save()}
          </Button>
        </div>
      </div>
    </form>
  </div>
</div>

<style lang="css">
  .autocomplete::after {
    top: 100% !important;
  }
</style>
