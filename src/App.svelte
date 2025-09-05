<script lang="ts">
  import Page from "./components/Page.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import { router } from "./lib/router.svelte";
</script>

<div class="app">
  <Sidebar bind:page={router.route} />

  <main class="content">
    <Page bind:page={router.route} />
  </main>
</div>

<style>
  .app {
    display: flex;
    height: 100%;
  }
  .content {
    flex: auto 1 0;
    padding: 1rem;
    overflow: auto;
  }
</style>
