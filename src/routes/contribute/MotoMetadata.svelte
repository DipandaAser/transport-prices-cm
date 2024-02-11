<script lang="ts">
  import type { PriceMotoMetadata } from "$models/prices";
  import Icon from "@iconify/svelte";
  import { Checkbox, Helper, Popover, Toggle } from "flowbite-svelte";
  import Toogle from "./Toogle.svelte";
  //@ts-ignore
  import { v4 as uuidv4 } from "uuid";

  export let metadata: PriceMotoMetadata | Record<string, any>;
  export let deletePrice: () => void;
  export let openCommentModalFunction: () => void;
  const internalId = uuidv4();
</script>

<div class="mt-5 flex flex-col justify-between">
  <div class="flex flex-col md:flex-row">
    <div class="flex space-x-4 md:pr-2 w-full mb-6 md:mr-2 md:mb-0">
      <ul class="flex w-full flex-col sm:flex-row">
        <li
          class="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium border border-primary-500 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <div>
            <Checkbox
              aria-describedby="day-{internalId}"
              bind:checked={metadata.day}
              >Jour
            </Checkbox>
            <Helper id="day-{internalId}" class="ps-6"
              >Check if the price is applicable during the day</Helper
            >
          </div>
        </li>

        <li
          class="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium border border-primary-500 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <div>
            <Checkbox
              aria-describedby="night-{internalId}"
              bind:checked={metadata.night}>Nuit</Checkbox
            >
            <Helper id="night-{internalId}" class="ps-6"
              >Check if the price is applicable during the night</Helper
            >
          </div>
        </li>
      </ul>
    </div>

    <ul class="flex flex-col sm:flex-row">
      <li
        class="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium border border-primary-500 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ms-px sm:mt-0 sm:first:rounded-se-none sm:first:rounded-es-lg sm:last:rounded-es-none sm:last:rounded-se-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      >
        <div>
          <Checkbox
            class="cursor-pointer"
            aria-describedby="vip-{internalId}"
            bind:checked={metadata.vip}>VIP / Depot</Checkbox
          >
          <Helper id="vip-{internalId}" class="ps-6"
            >Check if the price is when you take all the seats in the car</Helper
          >
        </div>
      </li>
    </ul>
  </div>
  <div class="mt-5 flex justify-between">
    <button on:click={openCommentModalFunction} class="text-primary-700 flex">
      <Icon class="mr-1" icon="mdi:comment-plus-outline" height={24} />
      Add a comment
    </button>

    <button
      on:click={() => {
        deletePrice();
      }}
      class="flex flex-col-reverse cursor-default"
    >
      <Icon
        icon="mdi:trash-outline"
        height={24}
        color="red"
        class="cursor-pointer"
        id={"pop" + internalId}
      />
    </button>
    <Popover triggeredBy={"#pop" + internalId}>Delete this entry?</Popover>
  </div>
</div>
