export const objectKeys = <Obj extends object>(obj: Obj): Array<keyof Obj> => {
    return Object.keys(obj || {}) as Array<keyof Obj>;
};

export const formatDate = (dateString?: string) => {
    if (!dateString) {
        return new Date().toISOString().split('T')[0];
    }
    return new Date(dateString).toISOString().split('T')[0];
};

export const isDateNow = (date: string): boolean => {
    return date === new Date().toISOString().split('T')[0];
}