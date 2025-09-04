<script lang="ts">
    import type { Character } from "../lib/types";
    export let character: Character;
    export let characters: Character[] = [];

    // derive relations
    const parents = () =>
        character.relations
            .filter((r) => r.type === "parent")
            .map((r) => characters.find((c) => c.id === r.targetId))
            .filter(Boolean);
    const children = () =>
        character.relations
            .filter((r) => r.type === "child")
            .map((r) => characters.find((c) => c.id === r.targetId))
            .filter(Boolean);
    const spouses = () =>
        character.relations
            .filter((r) => r.type === "spouse")
            .map((r) => characters.find((c) => c.id === r.targetId))
            .filter(Boolean);
</script>

<svg viewBox="0 0 900 400" width="100%">
    <!-- Parents (top) -->
    {#each parents() as p, i}
        <g
            transform={`translate(${220 + i * 160}, 70)`}
            tabindex="0"
            role="link"
            aria-label={`Parent ${p!.name}`}
        >
            <a href={`#/view/character/${p!.id}`}>
                <rect
                    x="-60"
                    y="-18"
                    width="120"
                    height="36"
                    rx="8"
                    fill="#0f162e"
                    stroke="#2a3161"
                ></rect>
                <text x="0" y="6" text-anchor="middle" fill="#cfd7ff"
                    >{p!.name}</text
                >
            </a>
        </g>
    {/each}

    <!-- Center (self) -->
    <g transform="translate(450,200)">
        <a href={`#/view/character/${character.id}`}>
            <rect
                x="-80"
                y="-22"
                width="160"
                height="44"
                rx="10"
                fill="#15213d"
                stroke="#3947a6"
            ></rect>
            <text x="0" y="6" text-anchor="middle" fill="#fff"
                >{character.name}</text
            >
        </a>
    </g>

    <!-- Spouses -->
    {#each spouses() as s, i}
        <g transform={`translate(${450 + (i + 1) * 140}, 200)`}>
            <a href={`#/view/character/${s!.id}`}>
                <rect
                    x="-60"
                    y="-18"
                    width="120"
                    height="36"
                    rx="8"
                    fill="#0f2a2f"
                    stroke="#2a3161"
                ></rect>
                <text x="0" y="6" text-anchor="middle" fill="#cfd7ff"
                    >{s!.name}</text
                >
            </a>
        </g>
    {/each}

    <!-- Children (bottom) -->
    {#each children() as ch, i}
        <g transform={`translate(${200 + i * 160}, 340)`}>
            <a href={`#/view/character/${ch!.id}`}>
                <rect
                    x="-50"
                    y="-16"
                    width="100"
                    height="32"
                    rx="6"
                    fill="#0b1a2b"
                    stroke="#2a3161"
                ></rect>
                <text x="0" y="6" text-anchor="middle" fill="#cfd7ff"
                    >{ch!.name}</text
                >
            </a>
        </g>
    {/each}

    <!-- Simple connecting lines -->
    {#each parents() as p, pi}
        <path
            d={`M ${220 + pi * 160} 100 C ${220 + pi * 160} 150, 450 150, 450 178`}
            stroke="#3947a6"
            fill="none"
            stroke-width="2"
        />
    {/each}
    {#each children() as ch, ci}
        <path
            d={`M 450 222 C 450 250, ${200 + ci * 160} 300, ${200 + ci * 160} 324`}
            stroke="#3947a6"
            fill="none"
            stroke-width="2"
        />
    {/each}
</svg>
