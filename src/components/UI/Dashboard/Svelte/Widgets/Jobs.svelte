<script lang=ts>
     
     const { job = {
          id: "0",
          name: "Job Name",
          type: "buy",
          amount: 1,
          world_token: "00000",
     } } = $props();
     

</script>

<main class="hover:cursor-pointer group relative md:max-w-45 max-h-45 md:max-h-50 duration-300 w-full h-full border rounded-ui shrink-0 overflow-hidden">
     <div class="bottom-0 absolute p-2 duration-300 w-full">
          <h1>{job.name}</h1>
          <h1>{job.type}</h1>
          <h1>{job.amount} legiticoin</h1>
     </div>
</main>