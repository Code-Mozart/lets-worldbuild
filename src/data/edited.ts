import type { Entity, Properties } from "./schema";

export type Edited<T extends Entity> =
    & Properties<T>
    & Partial<Entity>;
