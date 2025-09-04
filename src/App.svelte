<script lang="ts">
  import { route } from "./lib/router";
  import Toolbar from "./components/Toolbar.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Characters from "./pages/Characters.svelte";
  import Locations from "./pages/Locations.svelte";
  import Timeline from "./pages/Timeline.svelte";
  import MapPage from "./pages/Map.svelte";
  import View from "./pages/View.svelte";
  import Settings from "./pages/Settings.svelte";

  // subscribe to route store
  let current: { page: string; params: Record<string, string> } = {
    page: "dashboard",
    params: {},
  };
  $: route.subscribe((r) => (current = r));
</script>

<div class="app">
  <aside class="sidebar">
    <h1>LoreLink</h1>
    <nav>
      <a href="#/dashboard">Dashboard</a>
      <a href="#/characters">Characters</a>
      <a href="#/locations">Locations</a>
      <a href="#/timeline">Timeline</a>
      <a href="#/map">Map</a>
      <a href="#/settings">Settings</a>
    </nav>

    <div style="margin-top:12px">
      <Toolbar />
    </div>
  </aside>

  <main class="content">
    {#if current.page === "characters"}
      <Characters />
    {:else if current.page === "locations"}
      <Locations />
    {:else if current.page === "timeline"}
      <Timeline />
    {:else if current.page === "map"}
      <MapPage />
    {:else if current.page === "view"}
      <View params={current.params} />
    {:else if current.page === "settings"}
      <Settings />
    {:else}
      <Dashboard />
    {/if}
  </main>
</div>

<style>
  .app {
    display: flex;
    min-height: 100vh;
  }
  .sidebar {
    width: 260px;
    padding: 16px;
    border-right: 1px solid rgba(255, 255, 255, 0.04);
    background: #0f1220;
  }
  .content {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }
  nav a {
    display: block;
    padding: 6px 0;
    color: var(--accent);
    text-decoration: none;
  }
</style>
