<script lang="ts">
    import type { Step } from "./Stepper";

    export let steps: Step[];
    export let activeIndex: number;
</script>

<ol class="flex justify-center align-middle items-center content-center w-full">
    {#each steps as step, index}
        {#if index + 1 !== steps.length}
            <li
                class="flex w-full items-center {index + 1 < activeIndex
                    ? "text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
                    : "after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 after:inline-block dark:after:border-gray-700"}"
            >
                <div class="flex flex-col">
                    <span
                        class="flex flex-col items-center justify-center w-10 h-10 {index +
                            1 <=
                        activeIndex
                            ? 'bg-blue-200 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0'
                            : 'bg-gray-200 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0'} "
                    >
                        {step.Name}
                    </span>
                </div>
            </li>
        {:else}
            <li class="flex items-center">
                <span
                    class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0"
                >
                    <svg
                        class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                    >
                        <path
                            d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"
                        />
                    </svg>
                </span>
            </li>
        {/if}
    {/each}
</ol>
