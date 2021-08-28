export const updateObjectToArray = (items: any, itemId: any, propName: any, newObjProps: any) => {
    return items.map((item: any) => {
        if (item[propName] === itemId) {
            return {...item, ...newObjProps}
        }
        return {...item}
    })
}