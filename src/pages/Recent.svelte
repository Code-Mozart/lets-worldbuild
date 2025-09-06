<script lang="ts">
    import type { DAO } from "../data/dao";
    import type { Project } from "../data/schema";

    let { project = $bindable() }: { project: DAO<Project> } = $props();
</script>

<h1>Recent</h1>
