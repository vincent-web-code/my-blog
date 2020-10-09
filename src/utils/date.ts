export let formatterDate = (timestamp: string, rule?: string) => {
    let date = new Date(timestamp);
    let Y: number = date.getFullYear();
    let M: string | number = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D: string | number = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    let h: number | string = date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours();
    let m: number | string = date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes();
    let s: number | string = date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getMinutes();

    switch (rule) {
        case 'YYYY年MM月DD日':
            return `${Y}年${M}月${D}日`;
            break;
        default:
            return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    }
    
};