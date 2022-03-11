function cached(fn){
    let cache = Object.create(null);
    return function cachedFn(str){
        let hit = cache[str];
        return hit||(cache[str] = fn(str));
    }
}

let camelizeRE = /-(\w)/g;
function camelize(str){
    return str.replace(camelizeRE,function (_,c) {
        return c?c.toUpperCase():'';
    })
}

let _camelize = cached(camelize);