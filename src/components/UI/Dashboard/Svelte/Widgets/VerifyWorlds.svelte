<!-- TOGGLE LEFT SIDEBAR BUTTON -->

<script>
     import { onMount } from "svelte";

     const { cookies } = $props()

     let isAdmin = $state(false)

     // check if user is Admin
     onMount(async () => {
          // console.log(cookies)
          try {
               const response = await fetch(`https://wwlc.legiti.dev/api/user/${cookies.userUUID}`).then(async response => await response.json())
               isAdmin = response.admin;
          } catch (e) {
               console.log(e)
          }
     })
</script>

{#if isAdmin}
     <a href="/admin/verify-world" class="gap-x-2">
          Verify World
     </a>
{/if}
