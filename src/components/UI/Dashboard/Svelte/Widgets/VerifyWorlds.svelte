<!-- TOGGLE LEFT SIDEBAR BUTTON -->

<script>
     import { onMount } from "svelte";

     const { cookies } = $props()

     let isAdmin = $state(false)

     let responseData;
     // check if user is Admin
     onMount(async () => {
          // console.log(cookies)
          try {
               const response = await fetch(`https://wwlc.legiti.dev/api/user/${cookies.userUUID}`)
               responseData = await response.json()
               isAdmin = responseData.admin;
          } catch (e) {
               console.log(e)
          }

          if (responseData && responseData.success === true) {
               console.log(success)
          } else {
               console.log(success)
          }
     })
</script>

{#if isAdmin}
     <a href="/admin/verify-world" class="gap-x-2">
          Verify World
     </a>
{/if}
