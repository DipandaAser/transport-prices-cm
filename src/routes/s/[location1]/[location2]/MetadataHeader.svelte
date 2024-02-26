<script lang="ts">
    import { TransportType, type PriceData } from "$models/prices";
    import Icon from "@iconify/svelte";
    import * as multiLang from "$paraglide/messages";

    export let type: TransportType;
    export let data: PriceData;
</script>

{#if type === TransportType.Moto}
    <div class="flex space-x-2">
        <div class="flex flex-col lg:flex-row lg:space-x-2">
            <span class="flex items-center space-x-1">
                <span>{multiLang.day()}</span>
                <Icon
                    icon={data.refs.some((value) => {
                        return value.transportMetadata.day === true;
                    })
                        ? "flowbite:badge-check-outline"
                        : "flowbite:x-circle-outline"}
                    class={data.refs.some((value) => {
                        return value.transportMetadata.day === true;
                    })
                        ? "text-primary-500"
                        : "text-red-500"}
                />
            </span>
            <span class="flex items-center space-x-1">
                <span>{multiLang.night()}</span>
                <Icon
                    icon={data.refs.some((value) => {
                        return value.transportMetadata.night === true;
                    })
                        ? "flowbite:badge-check-outline"
                        : "flowbite:x-circle-outline"}
                    class={data.refs.some((value) => {
                        return value.transportMetadata.night === true;
                    })
                        ? "text-primary-500"
                        : "text-red-500"}
                />
            </span>
        </div>

        <span class="flex items-center space-x-1 self-start">
            <span>{multiLang.vipMotorbike()}</span>
            <Icon
                icon={data.refs.some((value) => {
                    return value.transportMetadata.vip === true;
                })
                    ? "flowbite:badge-check-outline"
                    : "flowbite:x-circle-outline"}
                class={data.refs.some((value) => {
                    return value.transportMetadata.vip === true;
                })
                    ? "text-primary-500"
                    : "text-red-500"}
            />
        </span>
    </div>
{:else if type === TransportType.Taxi}
    <div class="flex space-x-2">
        <div class="flex flex-col lg:flex-row lg:space-x-2">
            <span class="flex items-center space-x-1">
                <span>{multiLang.day()}</span>
                <Icon
                    icon={data.refs.some((value) => {
                        return value.transportMetadata.day === true;
                    })
                        ? "flowbite:badge-check-outline"
                        : "flowbite:x-circle-outline"}
                    class={data.refs.some((value) => {
                        return value.transportMetadata.day === true;
                    })
                        ? "text-primary-500"
                        : "text-red-500"}
                />
            </span>
            <span class="flex items-center space-x-1">
                <span>{multiLang.night()}</span>
                <Icon
                    icon={data.refs.some((value) => {
                        return value.transportMetadata.night === true;
                    })
                        ? "flowbite:badge-check-outline"
                        : "flowbite:x-circle-outline"}
                    class={data.refs.some((value) => {
                        return value.transportMetadata.night === true;
                    })
                        ? "text-primary-500"
                        : "text-red-500"}
                />
            </span>
        </div>

        <span class="flex items-center space-x-1 self-start">
            <span>{multiLang.vipTaxi()}</span>
            <Icon
                icon={data.refs.some((value) => {
                    return value.transportMetadata.vip === true;
                })
                    ? "flowbite:badge-check-outline"
                    : "flowbite:x-circle-outline"}
                class={data.refs.some((value) => {
                    return value.transportMetadata.vip === true;
                })
                    ? "text-primary-500"
                    : "text-red-500"}
            />
        </span>
    </div>
{:else}
    <span></span>
{/if}
