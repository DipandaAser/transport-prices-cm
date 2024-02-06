<script lang="ts">
  import Icon from "@iconify/svelte";
  //@ts-ignore
  import { v4 as uuidv4 } from "uuid";
  export let checked: boolean;
  export let iconUnChecked: string;
  export let iconChecked: string;
  export let iconSize: number;
  const id = uuidv4();
</script>

<label
  for={id}
  class="flex items-center cursor-pointer select-none text-dark dark:text-white"
>
  <div class="relative">
    <input
      {id}
      type="checkbox"
      {checked}
      class="peer toggleEight sr-only"
      on:change={() => (checked = !checked)}
    />
    <div
      class="h-5 transition duration-300 rounded-full bg-[#5c6992] peer-checked:bg-[#5c6992] shadow-inner box bg-dark dark:bg-dark-2 w-14 peer-checked:dark:bg-dark-3"
    ></div>
    <div
      class="absolute left-0 flex items-center justify-center transition bg-white rounded-full dot shadow-switch-1 -top-1 h-7 w-7 dark:bg-dark-3 peer-checked:translate-x-full peer-checked:bg-primary text-dark peer-checked:text-white"
    >
      <span
        class="flex items-center justify-center border rounded-full bg-inherit active"
      >
        {#if checked}
          <Icon icon={iconChecked} height={iconSize} />
        {:else}
          <Icon icon={iconUnChecked} height={iconSize} />
        {/if}
      </span>
    </div>
  </div>
</label>
