<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  //@ts-ignore
  import AutoComplete from "simple-svelte-autocomplete";
  import type { Position } from "$models/position";
  import { Button, SpeedDial, SpeedDialButton } from "flowbite-svelte";
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

  export let data: PageData;

  onMount(() => {
    document.querySelectorAll(".autocomplete").forEach((el) => {
      el.classList.add("w-full");
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

  $: console.log("prices", prices);
</script>

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
            <div class="flex w-full">
              <AutoComplete
                class="border border-gray mt-2 w-full rounded-md"
                style="width: 100%; height: 61px;"
                items={data.positions}
                bind:text={startingPositionText}
                bind:selectedItem={selectedStartingPosition}
                labelFieldName="name"
                valueFieldName="name"
                maxItemsToShowInList={10}
              ></AutoComplete>
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
            <div class="flex w-full">
              <AutoComplete
                class="border border-gray mt-2 w-full rounded-md"
                style="width: 100%; height: 61px;"
                items={data.positions}
                bind:text={endPositionText}
                bind:selectedItem={selectedEndPosition}
                labelFieldName="name"
                valueFieldName="name"
                maxItemsToShowInList={10}
              ></AutoComplete>
            </div>
          </div>

          <!-- PRICES -->
          <div class="flex items-center mt-14">
            <div class="flex-1 border-b border-gray-500"></div>
            <div
              style=" font-family: &quot;Inter&quot;, sans-serif;"
              class="mx-4 text-lg font-bold"
            >
              Prices
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
              <Icon icon="charm:plus" height={24} /> Add another price
            </Button>
          </div>
        </div>
        <div class="w-full mt-10">
          <Button
            class="w-full"
            on:click={() => {
              alert("Saved");
            }}
          >
            <Icon class="mr-2" icon="bx:bx-save" height={24} /> Save
          </Button>
        </div>
      </div>
    </form>
  </div>
</div>
