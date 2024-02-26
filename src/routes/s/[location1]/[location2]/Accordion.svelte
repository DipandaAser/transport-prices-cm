<script lang="ts">
    import {
        TransportTypeIconsInDropdown,
        TransportTypeLabelsTranslated,
        type PricesByTransportType,
    } from "$models/prices";
    import { languageTag } from "$paraglide/runtime";
    import Icon from "@iconify/svelte";
    import {
        Accordion,
        AccordionItem,
        Span,
        Timeline,
        TimelineItem,
    } from "flowbite-svelte";
    import MetadataHeader from "./MetadataHeader.svelte";
    import MetadataComment from "./MetadataComment.svelte";
    import * as multiLang from "$paraglide/messages";

    export let data: PricesByTransportType[];
    const maxShowingPricesPerTransportType = 2;
    const showMore = Array(data.length).fill(false);
    const open: boolean[][] = [];

    data.forEach((transportTypePrices, transportTypePricesIndex) => {
        open[transportTypePricesIndex] = [];
        transportTypePrices.prices.forEach((price, priceIndex) => {
            open[transportTypePricesIndex].push(false);
        });
    });

    $: console.log(open);
</script>

{#each data as transportTypePrices, transportTypePricesIndex}
    <div class="mb-4">
        <Accordion
            multiple
            activeClass="bg-white dark:bg-white"
            inactiveClass="bg-white dark:bg-white"
            style="width= 100%"
        >
            {#each transportTypePrices.prices as price, priceIndex}
                <AccordionItem
                    open={open[transportTypePricesIndex][priceIndex]}
                    defaultClass={priceIndex >=
                        maxShowingPricesPerTransportType &&
                    !showMore[transportTypePricesIndex]
                        ? "hidden"
                        : "flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700"}
                >
                    <div
                        class=" flex justify-between w-full pr-4 items-center"
                        slot="header"
                    >
                        <div class="flex space-x-3 items-center">
                            <Icon
                                icon={TransportTypeIconsInDropdown[
                                    transportTypePrices._id
                                ]}
                                height={35}
                            />
                            <Span gradient class="text-black ">
                                {TransportTypeLabelsTranslated[languageTag()][
                                    transportTypePrices._id
                                ]}
                            </Span>
                        </div>
                        <div class="sm:block hidden">
                            <MetadataHeader
                                type={transportTypePrices._id}
                                data={price}
                            />
                        </div>
                        <div class="ml-4">
                            <Span class="text-primary-500">
                                {price.price} FCFA
                            </Span>
                        </div>
                    </div>
                    <!-- BODY OF THE ACCORDION ITEM -->
                    <div>
                        <Timeline order="vertical">
                            {#each price.refs as ref}
                                <TimelineItem
                                    date={ref.createdAt.toDateString() +
                                        " " +
                                        ref.createdAt.toLocaleTimeString()}
                                >
                                    <MetadataComment
                                        type={transportTypePrices._id}
                                        data={ref.transportMetadata}
                                    />
                                    <p
                                        class="text-base font-normal text-gray-500 dark:text-gray-400"
                                    >
                                        {ref.comment || multiLang.noComments()}
                                    </p>
                                </TimelineItem>
                            {/each}
                        </Timeline>
                    </div>
                </AccordionItem>
            {/each}
            {#if transportTypePrices.prices.length > maxShowingPricesPerTransportType}
                <button
                    class="w-full h-8 px-5 bg-white border-gray-200 border-s border-b border-e rounded-b-xl"
                    on:click={() => {
                        if (showMore[transportTypePricesIndex]) {
                            for (
                                let i = maxShowingPricesPerTransportType - 1;
                                i < open[transportTypePricesIndex].length;
                                i++
                            ) {
                                open[transportTypePricesIndex][i] = false;
                            }
                        }

                        showMore[transportTypePricesIndex] =
                            !showMore[transportTypePricesIndex];
                    }}
                >
                    <div class="flex justify-between w-full align-middle">
                        <div class="flex space-x-3 align-middle justify-center">
                            <span
                                class="hover:bg-gray-200 rounded transition-colors duration-200"
                            >
                                <Icon
                                    icon={showMore[transportTypePricesIndex]
                                        ? "iconamoon:arrow-up-2-bold"
                                        : "iconamoon:arrow-down-2-bold"}
                                    height={24}
                                    color="black"
                                />
                            </span>
                            <span class="text-black">
                                {showMore[transportTypePricesIndex]
                                    ? multiLang.hideMoreTransportPrices({
                                          numberOfItems:
                                              transportTypePrices.prices
                                                  .length -
                                              maxShowingPricesPerTransportType,
                                      })
                                    : multiLang.showMoreTransportPrices({
                                          numberOfItems:
                                              transportTypePrices.prices
                                                  .length -
                                              maxShowingPricesPerTransportType,
                                      })}
                            </span>
                        </div>
                    </div>
                </button>
            {/if}
        </Accordion>
    </div>
{/each}
