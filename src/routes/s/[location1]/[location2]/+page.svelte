<script lang="ts">
    import type { PageData } from "./$types";
    import * as multiLang from "$paraglide/messages";
    import OpenGraphMeta from "$components/meta/OpenGraphMeta.svelte";
    import { onMount } from "svelte";
    import { searchPositionAPI } from "$lib/apiClient/positions";
    import { PositionTypes } from "$models/position";
    import Icon from "@iconify/svelte";
    import { Button } from "flowbite-svelte";
    //@ts-ignore
    import AutoComplete from "simple-svelte-autocomplete";
    onMount(() => {
        document.querySelectorAll(".autocomplete").forEach((el) => {
            // Fix the position of the dropdown to be in the middle of the input
            (el as HTMLElement).style.setProperty("height", "113%");
            el.classList.add("w-full");
        });
    });

    export let data: PageData;
    function getTitle() {
        if (data.location1.found === false) {
            // not found
            return multiLang.locationNotFoundMetaTitle({
                location: data.location1.searchWord,
            });
        } else if (data.location2.found === false) {
            // not found
            return multiLang.locationNotFoundMetaTitle({
                location: data.location2.searchWord,
            });
        }

        // both found
        return "";
    }
    function getDescription() {
        if (data.location1.found === false) {
            // not found
            return multiLang.locationNotFoundMetaDescription({
                location: data.location1.searchWord,
            });
        } else if (data.location2.found === false) {
            // not found
            return multiLang.locationNotFoundMetaDescription({
                location: data.location1.searchWord,
            });
        }

        // both found
        return "";
    }

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

    let searchUrlPath: string = "";
    let startingLocation: string = "";
    let endingLocation: string = "";

    function formatSearchURLPath(
        startingLocation: string,
        endingLocation: string,
    ): string {
        let base = "/s";
        if (startingLocation && startingLocation !== "") {
            base += `/${startingLocation}`;
        }

        if (endingLocation && endingLocation !== "") {
            base += `/${endingLocation}`;
        }

        return base;
    }

    $: searchUrlPath = formatSearchURLPath(startingLocation, endingLocation);
</script>

<svelte:head>
    <title>Transport CM: {getTitle()}</title>
    <meta name="description" content={getDescription()} />
    <OpenGraphMeta title={getTitle()} description={getDescription()} />
</svelte:head>

<div
    class="relative bg-cover bg-center bg-no-repeat backdrop-opacity-10 py-16 bg-[url('/bg-mb-01.webp')] md:bg-[url('/bg-mb-01.webp')]"
>
    <div class="container lg:flex mx-auto my-auto px-4 justify-around">
        <div
            class="lg:justify-evenly flex flex-col space-y-10 lg:space-y-0 lg:space-x-2 lg:flex-row"
        >
            <div
                class="lg:max-w-[50%] text-white text-left flex flex-col justify-center"
            >
                {#if data.location1.found && data.location2.found}
                    <span> Locations found </span>
                {/if}

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
                    <div class="">
                        <AutoComplete
                            id="from"
                            class="border h-[61px] text-gray-800 mt-2 w-full text-base  tracking-wide font-semibold rounded-md flex px-3 py-2"
                            placeholder={multiLang.startingLocationPlaceholder()}
                            searchFunction={searchPosition}
                            bind:text={startingLocation}
                            localSorting={true}
                            labelFieldName="name"
                            valueFieldName="name"
                            maxItemsToShowInList={5}
                            dropdownClassName="w-full top-0 tracking-wide font-light text-base"
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
                    <div class="">
                        <AutoComplete
                            id="from"
                            class="border h-[61px] text-gray-800 mt-2 w-full text-base  tracking-wide font-semibold rounded-md flex px-3 py-2"
                            placeholder={multiLang.destinationPlaceholder()}
                            searchFunction={searchPosition}
                            bind:text={endingLocation}
                            localSorting={true}
                            labelFieldName="name"
                            valueFieldName="name"
                            maxItemsToShowInList={5}
                            dropdownClassName="w-full top-0 tracking-wide font-light text-base"
                        />
                    </div>
                </div>
                <Button
                    class="space-x-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[#bd1e59] text-white"
                    href={searchUrlPath}
                >
                    <Icon icon="fluent:search-12-filled" height={24} />
                    <span class="font-medium tracking-[.03em] text-base">
                        {multiLang.seeAllPrices()}
                    </span>
                </Button>
            </div>
        </div>
    </div>
</div>

<div class="my-auto px-5">
    {#if !data.location1.found || !data.location2.found}
        <section class="w-full my-20 text-black">
            <h2 class="text-5xl mb-10 text-black">
                {multiLang.locationNotFoundTitle()}
            </h2>
            <div class="text-l">
                <p class="mb-3">{multiLang.suggestions()}</p>
                <ul class="pl-9 list-inside list-disc space-y-1 mb-3">
                    <li>{multiLang.suggestionsCheckLocationSpelling()}</li>
                    <li>{multiLang.suggestionsTryDifferentLocation()}</li>
                    <li>
                        {multiLang.suggestionsContributeLocation()}
                        <!-- TODO: Add link to redirect to specifiq page -->
                    </li>
                    <li>
                        {multiLang.suggestionsRequestLocation()}
                        <!-- TODO: Add link to redirect to specifiq page -->
                    </li>
                </ul>
                <p>
                    {@html multiLang.errorOccurSendFeedback({
                        feedbackHtml:
                            '<a target="_blank" rel="noopener noreferrer" href=' +
                            multiLang.feedBackFormLink() +
                            ">feedback</a>",
                    })}
                </p>
            </div>
        </section>
    {/if}

    {#if data.location1.found && data.location2.found}
        <!-- Locations exits but not prices -->
        <div class="bg-primary-500 h-full" style="height: 700px;">
            Two locations "{data.location1.searchWord}" TO "{data.location2
                .searchWord}"
        </div>
    {/if}

    {#if data.location1.found && data.location2.found}
        <!-- Locations and prices exits -->
        <div class="bg-primary-500 h-full" style="height: 700px;">
            Two locations "{data.location1.searchWord}" TO "{data.location2
                .searchWord}"
        </div>
    {/if}

    <!-- POPULAR TRAVELS -->

    <!-- POPULAR CITIES -->
</div>
