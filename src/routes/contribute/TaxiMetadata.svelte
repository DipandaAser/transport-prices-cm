<script lang="ts">
  import type { PriceTaxiMetadata } from "$models/prices";
  import Icon from "@iconify/svelte";
  import { Popover, Toggle } from "flowbite-svelte";
  import Toogle from "./Toogle.svelte";
  //@ts-ignore
  import { v4 as uuidv4 } from "uuid";

  export let metadata: Record<string, any> | PriceTaxiMetadata;
  export let deletePrice: () => void;
  const internalId = uuidv4();
</script>

<div class="mt-5 flex flex-row justify-between">
  <div class="flex flex-col md:flex-row">
    <div
      class="flex md:pr-2 items-center mb-6 md:mr-2 md:mb-0 md:border-r-2 border-primary-500 border-dashed"
    >
      Nuit
      <span class="mx-4">
        <Toogle
          bind:checked={metadata.day}
          iconChecked="meteocons:fog-day-fill"
          iconUnChecked="meteocons:fog-night-fill"
          iconSize={36}
        ></Toogle>
      </span>
      Jour
    </div>
    <Toggle bind:checked={metadata.vip}>Avec bachement</Toggle>
  </div>
  <button
    class="flex flex-col-reverse"
    on:click={() => {
      deletePrice();
    }}
  >
    <Icon
      icon="mdi:trash-outline"
      height={24}
      color="red"
      class="cursor-pointer visible md:hide underline"
      id={"pop" + internalId}
    />
  </button>
  <Popover triggeredBy={"#pop" + internalId}>Delete this entry?</Popover>
</div>
