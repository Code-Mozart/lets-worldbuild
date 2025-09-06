<script lang="ts">
  import Page from "./components/Page.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import { database } from "./data/database.svelte";
  import { router } from "./lib/router.svelte";

  let project = Object.values(database.projects.get())
    .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
    .at(0)!;
</script>

<div class="app">
  <Sidebar bind:page={router.route} />

  <main class="content">
    <Page bind:page={router.route} bind:project />
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
