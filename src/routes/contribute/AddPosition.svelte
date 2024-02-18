<script lang="ts">
  import {
    Button,
    Helper,
    Input,
    Label,
    Modal,
    Select,
    Spinner,
    Toast,
  } from "flowbite-svelte";
  import Icon from "@iconify/svelte";
  import * as multilang from "$paraglide/messages";
  import * as multilangRuntime from "$paraglide/runtime";
  //@ts-ignore
  import AutoComplete from "simple-svelte-autocomplete";
  import {
    PositionTypes,
    type Position,
    PositionsTypesI18N,
    type AddPositionRequestBody,
  } from "$models/position";
  import {
    createPositionAPI,
    searchPositionAPI,
  } from "$lib/apiClient/positions";
  import { browser } from "$app/environment";
  import { fly } from "svelte/transition";

  export let open = false;
  const positionTypes = {
    en: [
      {
        value: PositionTypes.Place,
        name: PositionsTypesI18N["en"][PositionTypes.Place],
      },
      {
        value: PositionTypes.Ward,
        name: PositionsTypesI18N["en"][PositionTypes.Ward],
      },
      {
        value: PositionTypes.City,
        name: PositionsTypesI18N["en"][PositionTypes.City],
      },
    ],
    fr: [
      {
        value: PositionTypes.Place,
        name: PositionsTypesI18N["fr"][PositionTypes.Place],
      },
      {
        value: PositionTypes.Ward,
        name: PositionsTypesI18N["fr"][PositionTypes.Ward],
      },
      {
        value: PositionTypes.City,
        name: PositionsTypesI18N["fr"][PositionTypes.City],
      },
    ],
  };

  async function searchParentPosition(keyword: string) {
    let positionToSearch: PositionTypes = PositionTypes.City;

    if (positionType == PositionTypes.Place) {
      positionToSearch = PositionTypes.Ward;
    }

    if (positionType == PositionTypes.Ward) {
      positionToSearch = PositionTypes.City;
    }

    return searchPositionAPI(positionToSearch)
      .then((positions) => {
        return positions;
      })
      .catch(() => {
        return [];
      });
  }

  async function updateWidthOfAutocomplete(positionType: string) {
    if (!browser) return;
    await new Promise((r) => setTimeout(r, 30));
    document.querySelectorAll(".autocomplete").forEach((el) => {
      // Fix the position of the dropdown to be in the middle of the input
      // (el as HTMLElement).style.setProperty("height", "113%");
      el.classList.add("w-full");
      el.classList.add("mb-6");
    });
  }

  function forceAutocompletelistDirection(s: string) {
    if (!browser) return;
    const autoCompleteList = document.querySelector(".autocomplete-list");

    if (autoCompleteList == null || undefined) return;

    (autoCompleteList as HTMLElement).style.top = "0px";
  }

  function save() {
    if (submissionState !== "idle") {
      return;
    }

    if (positionType === PositionTypes.All) {
      fieldErrors.type = "Please choose a valid location type";
      return;
    }

    if (positionType !== PositionTypes.City && selectedParent === undefined) {
      fieldErrors.parent =
        "Please an existing choose a valid parent location or create one";
      return;
    }

    if (positionNameValue === "") {
      fieldErrors.name = "Please enter a valid name";
      return;
    }

    const posData: AddPositionRequestBody = {
      name: positionNameValue,
      positionType: positionType,
      parentId: selectedParent ? selectedParent._id : "",
    };

    submissionState = "pending";
    // Save the position
    createPositionAPI(posData)
      .then(() => {
        submissionState = "success";
        positionNameValue = "";
      })
      .catch((error) => {
        submissionState = "error";
        submissionError = error.message;
      });
  }

  const fieldErrors: { [key: string]: string } = {
    type: "",
    parent: "",
    name: "",
  };

  function clearFieldsErrors() {
    fieldErrors.type = "";
    fieldErrors.parent = "";
    fieldErrors.name = "";
  }

  let submissionState: "idle" | "pending" | "success" | "error" = "idle";
  let submissionError: string = "";
  let positionNameValue: string = "";
  let selectedParent: Position;
  let parentPosiotionText: string;
  let parentPosiotionType: PositionTypes = PositionTypes.Ward;
  let positionType: PositionTypes = PositionTypes.Place;
  $: updateWidthOfAutocomplete(positionType);
  $: forceAutocompletelistDirection(parentPosiotionText);
  // Change the save button to default after 2 seconds
  $: if (submissionState === "success") {
    setTimeout(() => {
      submissionState = "idle";
    }, 3000);
  }
  // open the toast if there is an error and close it after 3 seconds
  $: if (submissionState === "error") {
    setTimeout(() => {
      submissionState = "idle";
    }, 3000);
  }
</script>

{#if submissionState === "error"}
  <Toast
    open={submissionState === "error"}
    dismissable={false}
    transition={fly}
    params={{ x: 200 }}
    color="red"
    position="top-right"
    class="absolute z-50 top-2"
  >
    <Icon slot="icon" icon="solar:danger-broken" height={24} />
    {submissionError}
  </Toast>
{/if}

<Modal
  size="lg"
  class="h-[500px]"
  on:close={() => history.back()}
  title={multilang.addMissingLocation()}
  bind:open
>
  <svelte:fragment slot="footer">
    <div class="w-full flex justify-between">
      <Button type="submit" class="w-full flex space-x-2" on:click={save}>
        {#key submissionState}
          {#if submissionState === "success"}
            <Icon icon="line-md:check-all" height={24} />
            <span>
              {multilang.locationAddedSuccessfully()}
            </span>
          {:else if submissionState === "pending"}
            <Spinner />
            <span>
              {multilang.savingInProgress()}
            </span>
          {:else}
            <Icon icon="bx:bx-save" height={24} />
            <span>
              {multilang.save()}
            </span>
          {/if}
        {/key}
      </Button>
    </div>
  </svelte:fragment>

  <form class="flex flex-col space-y-6" action="#">
    <div class="flex flex-col space-y-6">
      <Label class="space-y-1">
        <span>{multilang.chooseTheLocationType()}</span>
        <Select
          disabled={submissionState !== "idle" && submissionState !== "error"
            ? true
            : false}
          size="lg"
          on:change={() => {
            clearFieldsErrors();
            if (positionType === PositionTypes.Place) {
              parentPosiotionType = PositionTypes.Ward;
              return;
            }

            if (positionType === PositionTypes.Ward) {
              parentPosiotionType = PositionTypes.City;
              return;
            }

            parentPosiotionType = PositionTypes.All;
          }}
          placeholder={multilang.chooseTheLocationType()}
          items={positionTypes[multilangRuntime.languageTag()]}
          bind:value={positionType}
        />
        <Helper class={fieldErrors.type !== "" ? "mt-10 text-red-700" : "hide"}>
          {fieldErrors.type}
        </Helper>
      </Label>

      {#key positionType}
        {#if positionType !== PositionTypes.City && positionType !== ""}
          <div class="w-full mb-6">
            <Label>
              <span>
                {multilang.inWhichParentLocationThisLocationIsLocated({
                  parentLocation:
                    PositionsTypesI18N[multilangRuntime.languageTag()][
                      parentPosiotionType
                    ],
                  location:
                    PositionsTypesI18N[multilangRuntime.languageTag()][
                      positionType
                    ],
                })}
              </span>
              <AutoComplete
                disabled={submissionState !== "idle" &&
                submissionState !== "error"
                  ? true
                  : false}
                onFocus={() => {
                  fieldErrors.parent = "";
                }}
                required
                bind:text={parentPosiotionText}
                id="auto4Parent"
                class="border h-[50px] border-gray my-2 w-full rounded-md"
                searchFunction={searchParentPosition}
                bind:selectedItem={selectedParent}
                labelFieldName="name"
                localFiltering={true}
                showLoadingIndicator={true}
                inputClassName="w-full h-full "
                dropdownClassName="w-full top-0 text-lg divide-y divide-y-reverse divide-blue-500"
                noResultsText={multilang.notFoundYourLocationAddIt({
                  location: "' " + parentPosiotionText + " '",
                  locationType:
                    PositionsTypesI18N[multilangRuntime.languageTag()][
                      parentPosiotionType
                    ],
                })}
              />
              <Helper
                class={fieldErrors.parent !== "" ? "mt-2 text-red-700" : "hide"}
              >
                {fieldErrors.parent}
              </Helper>
            </Label>
          </div>
        {/if}
      {/key}

      <Label class="space-y-2">
        <span>
          {multilang.nameOf() +
            " " +
            PositionsTypesI18N[multilangRuntime.languageTag()][positionType]}
        </span>
        <Input
          disabled={submissionState !== "idle" && submissionState !== "error"
            ? true
            : false}
          on:input={() => {
            fieldErrors.name = "";
          }}
          bind:value={positionNameValue}
          size="lg"
        />
        <Helper class={fieldErrors.name !== "" ? "mt-2 text-red-700" : "hide"}>
          {fieldErrors.name}
        </Helper>
      </Label>
    </div>
  </form>
</Modal>
