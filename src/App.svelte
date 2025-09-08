<script>
  import Page from "./components/Page.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import { database } from "./data/database.svelte";
  import { router } from "./lib/routing/router.svelte";

  const getProjectID = () =>
    Object.values(database.projects)
      .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
      .at(0).id;
  let project = $state(database.projects[getProjectID()]);
  $inspect(project);
</script>

<div class="app">
  <Sidebar currentHash={router.hash} />

  <main class="content">
    <Page current={router} bind:project />
  </main>
</div>

<style>
  .app {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .content {
    flex: auto 1 1;
    padding: 2rem;
    overflow-x: clip;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
  }
</style>
