<script lang="ts">
     import { onMount } from "svelte";
     let { data = {id: 1, job: "", fromType: "world/user", fromId: "", status: "approved/rejected/waiting", "amount": 1, time: ""} } = $props()
     let date: string = $state("");
     
     onMount(() => {
          date = new Date(data.time).toLocaleString()
     })

</script>

<details class="p-2 px-5 rounded-ui flex flex-col gap-1 dark:bg-black bg-black/10 select-none">

     <summary>
          {data.job}
     </summary>
     <div>
          <h1 class="flex-1 ">{data.amount} Legiticoin(s)</h1>
          <h1 class="flex-1 capitalize">{date}</h1>
          <h1 class="flex-1 capitalize">{data.status}</h1>
     </div>
</details>