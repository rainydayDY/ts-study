/**
 * Created dongyu at 2018/3/16.
 */

export function validatePhone(str: string) {
    const reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
    return reg.test(str);
}

export function isvalidUsername(str: string) {
    const validMap = ['admin', 'editor'];
    return validMap.indexOf(str.trim()) >= 0;
}

/* 小写字母*/
export function validateLowerCase(str: string) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str: string) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str: string) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

/* 身份证号*/
export function validateIdentity(str: string) {
    const reg = /^[1-9]\d{5}[1|2]\d{3}[0|1]\d{1}[0|1|2|3]\d{4}([0-9|X])$/;
    return reg.test(str);
}

/* 验证密码*/
export function validatePassword(str: string) {
    const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
    return reg.test(str);
}
