<script lang="ts">
  import Page from "./components/Page.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import { state } from "./lib/database.svelte";
  import { router } from "./lib/router.svelte";
</script>

<div class="app">
  <Sidebar bind:page={router.route} />

  <main class="content">
    <Page bind:page={router.route} bind:projectID={state.projectID} />
  </main>
</div>

<style>
  .app {
    display: flex;
    height: 100%;
  }
  .content {
    flex: auto 1 0;
    padding: 2rem;
    overflow: auto;
  }
</style>
