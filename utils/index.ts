export const objectKeys = <Obj extends object>(obj: Obj): Array<keyof Obj> => {
    return Object.keys(obj || {}) as Array<keyof Obj>;
};
