<script>
     let { data } = $props()
</script>

<main class="mx-5 h-full rounded-ui flex-1">
     <div class="w-full h-full backdrop-blur-2xl items-center justify-items-center">
          <h1 class="font-wordmark text-mobile-title md:text-[120px] text-center pt-10">World Wide LegitiCoins.</h1>

          <!-- 3D HOVER CARD  -->
          <div class="hover-3d relative left-1/2 -translate-x-1/2">
               <figure class="rounded-ui overflow-hidden">
                    <img src={data.images.ragebird} alt="ragebirds-credit" class="w-250">
               </figure>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
          </div>

          <p class="text-[12px] md:text-2xl max-w-150 text-center font-ui my-10">Huge thanks to Ragebird for putting more effort in Ideation of the World Wide Legiticoins than the entirety of LegitiDevs has ever put on a project, combined!</p>
          
     </div>
     
     <div class="gap-3 flex flex-1 flex-col md:flex-row w-full justify-center my-5">
          <a href="/login" class="p-3 text-center duration-300 hover:scale-102 font-ui bg-white dark:bg-neutral-900 border min-w-50">Login</a>
          <a href="/dashboard/my-worlds" class="p-3 text-center duration-300 hover:scale-102 font-ui bg-white dark:bg-neutral-900 border min-w-50">Dashboard</a>
     </div>
</main>