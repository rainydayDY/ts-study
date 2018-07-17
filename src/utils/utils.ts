// interface FormatObj {
//     y: number;
//     m: number;
//     d: number;
//     h: number;
//     i: number;
//     s: number;
//     a: number;
// }

export function parseTime(time: number, cFormat: string) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) { time = time * 1000; }
        date = new Date(time);
    }
    const formatObj: any = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: string, key: string) => {
        let value = formatObj[key];
        if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1]; }
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return timeStr;
}
