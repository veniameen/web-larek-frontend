
export class LocalStorage {
    get(key: string) {      // 'products'      => [{id,title, price,descriptiom}]
        const json = localStorage.getItem(key)

        if(json) {
            const result = JSON.parse(json)

            return result
        }
    } 
    set<Value>(key: string, value: Value ) {
        const json = JSON.stringify(value)
        localStorage.setItem(key, json)
    }
}