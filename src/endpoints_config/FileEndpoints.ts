import baseUrl from "./base"

const filePathPrefix = '/files'
const fileBaseUrl = baseUrl + filePathPrefix;

export const getFile = fileBaseUrl + '/'
export const getAllFiles = fileBaseUrl + '/all';
export const ready = fileBaseUrl + '/ready'
export const updateFile = fileBaseUrl + '/update'
export const removeFile = fileBaseUrl + '/remove'
export const prepareFiles = fileBaseUrl + '/prepare'