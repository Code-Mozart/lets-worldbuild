class State {
    counter: number;
    localStorageVal = $state(localStorage.getItem("counter"));

    constructor() {
        this.counter = $state(1);
        $effect.root(() => {
            $effect(() => {
                const serialized = JSON.stringify(this.counter);
                localStorage.setItem("counter", serialized);
                console.log("update local storage", serialized);
                this.localStorageVal = localStorage.getItem("counter");
            });
        });
    }
}

export const state = new State();
