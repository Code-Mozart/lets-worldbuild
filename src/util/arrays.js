export const partition = (arr, selector) => {
    const actualPartitions = arr.reduce(
        (partitions, item, index) => {
            const partition = selector({ item, index });
            partitions[partition] = partition in partitions
                ? [...partitions[partition], item]
                : [item];
            return partitions;
        },
        {},
    );

    const proxyHandler = {
        get(target, property, _) {
            return property in target ? target[property] : [];
        },
    };
    return new Proxy(actualPartitions, proxyHandler);
};
