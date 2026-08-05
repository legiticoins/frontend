<script>
     const { 
     jobName = "My World", 
     jobAmount = "My World", 
     jobWorldToken = "My World", 
     jobType = "My World", 
     jobId = "My World", 
     } = $props();

</script>

<main class="hover:cursor-pointer group aspect-square relative md:max-w-100 max-h-45 md:max-h-50 duration-300 w-full h-full border rounded-ui shrink-0 overflow-hidden">
     <div class="bottom-0 absolute p-2 duration-300 w-full group-hover:opacity-100 opacity-0">
          <h1>{jobName}</h1>
          <h1>{jobAmount}</h1>
          <h1>{jobType}</h1>
     </div>
</main>