export const partition = <T extends any[], P extends string>(
    arr: T,
    selector: (args: { item: T[number]; index: number }) => P,
) => {
    type Result = Record<P, T[number][]>;
    const actualPartitions = arr.reduce(
        (partitions, item, index) => {
            const partition = selector({ item, index });
            partitions[partition] = partition in partitions
                ? [...partitions[partition], item]
                : [item];
            return partitions;
        },
        {},
    ) as Partial<Result>;

    const proxyHandler: ProxyHandler<Result> = {
        get(target, property, receiver) {
            return property in target ? target[property as P] : [];
        },
    };
    return new Proxy(actualPartitions, proxyHandler) as Result;
};
