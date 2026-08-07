<script>
     
     let uuid = $state("");
     let status = $state("");

     let { cookies } = $props();
     
     async function verifyWorld() {

          if (uuid === "") {
               status = "UUID cannot be empty."
               return
          }
          try {
               const response = await fetch(`https://wwlc.legiti.dev/api/world/verify/${uuid}`, {
                    method: 'POST',
                    headers: {
                         'Authorization': `Bearer ${cookies.authToken}`
                    }
               }).then(async response => response.json())
          } catch (error) {
               status = "World couldn't be verified."
               console.log(error)
          }

          if (response && response.success === true) {
               status = 'World has been Verified!'
          } else {
               status = "World couldn't be verified."
          }
     }
     
</script>

<div class="px-5 font-ui">
     <h1 class="text-mobile-title">Verify World</h1>
     <div class="flex gap-1">
          <input bind:value={uuid} class="p-2 dark:bg-white/10 outline-0 rounded-ui bg-black/90" type="text" placeholder="Enter World UUID..">
          <button class="p-2 rounded-ui hover:cursor-pointer max-w-30 justify-self-center flex-1 bg-green-700/50" onclick={() => {verifyWorld()}}>Verify</button>
     </div>
     <p class="my-2">{status}</p>
</div>
