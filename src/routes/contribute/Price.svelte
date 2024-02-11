<script lang="ts">
  import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    Input,
    Modal,
    Popover,
    Textarea,
  } from "flowbite-svelte";
  import Icon from "@iconify/svelte";
  import {
    TransportType,
    TransportTypeIconsInDropdown,
    TransportTypeLabels,
    TransportTypes,
    type Price,
    generateMetadataForTransportType,
    TransportTypeLabelsTranslated,
  } from "$models/prices";
  import MotoMetadata from "./MotoMetadata.svelte";
  import { onMount } from "svelte";
  import TaxiMetadata from "./TaxiMetadata.svelte";
  import * as multiLang from "$paraglide/messages";
  import { languageTag } from "$paraglide/runtime";
  export let price: Price;
  export let deletePrice: () => void;
  let dropdownOpen = false;

  onMount(() => {
    const priceInput = document.getElementById(
      "priceInput" + price._id
    ) as HTMLInputElement;
    priceInput.step = "25";
    priceInput.min = "100";
  });

  function openCommentModalFunction() {
    openCommentModal = true;
  }

  let openCommentModal = false;
</script>

<div class="w-full flex items-center space-x-2">
  <div class="w-full flex flex-col">
    <ButtonGroup class="w-full">
      <Button
        color="none"
        class="pr-0 mr-0 flex-shrink-0 text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        <Icon
          icon={TransportTypeIconsInDropdown[price.transportType]}
          height={24}
        />
        <!-- <span class="text-xl">
          {TransportTypeIconsInDropdown[transportType]}
        </span> -->
        &nbsp; {TransportTypeLabelsTranslated[languageTag()][
          price.transportType
        ]}
        <Icon
          class="mr-0"
          icon="basil:caret-down-solid"
          height="24"
          color="black"
        />
      </Button>
      <Dropdown bind:open={dropdownOpen}>
        {#each TransportTypes as tp}
          <DropdownItem
            on:click={() => {
              price.transportType = tp;
              price.transportMetadata = generateMetadataForTransportType(tp);
              dropdownOpen = false;
            }}
          >
            <div class="flex flex-row justify-start">
              <Icon
                class="mr-4"
                icon={TransportTypeIconsInDropdown[tp]}
                height={24}
              />
              {TransportTypeLabelsTranslated[languageTag()][tp]}
            </div>
          </DropdownItem>
        {/each}
      </Dropdown>
      <Input
        id="priceInput{price._id}"
        bind:value={price.price}
        type="number"
        placeholder="Prix"
      />
      <Button disabled color="primary" class="!p-2.5" type="submit">FCFA</Button
      >
    </ButtonGroup>
    {#if price.transportType === TransportType.Moto}
      <MotoMetadata
        bind:metadata={price.transportMetadata}
        bind:deletePrice
        {openCommentModalFunction}
      ></MotoMetadata>
    {:else if price.transportType === TransportType.Taxi}
      <TaxiMetadata
        bind:metadata={price.transportMetadata}
        bind:deletePrice
        {openCommentModalFunction}
      ></TaxiMetadata>
    {:else}
      <div class="mt-5 flex justify-between">
        <button
          on:click={openCommentModalFunction}
          class="text-primary-700 flex"
        >
          <Icon class="mr-1" icon="mdi:comment-plus-outline" height={24} />
          Add a comment
        </button>
        <button
          on:click={() => {
            deletePrice();
          }}
        >
          <Icon
            icon="mdi:trash-outline"
            height={24}
            color="red"
            class="cursor-pointer visible md:hide"
            id="pop"
          />
        </button>
        <!-- @ts-ignore -->
        <Popover triggeredBy="#pop">Delete this entry?</Popover>
      </div>
    {/if}

    <Modal
      bind:open={openCommentModal}
      dismissable={true}
      autoclose={true}
      outsideclose={true}
      title="Write your comment"
      class="w-full"
    >
      <Textarea
        bind:value={price.comment}
        placeholder="Enter your comment"
        rows={10}
      ></Textarea>
    </Modal>
  </div>
</div>
