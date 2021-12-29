import baseUrl from "./base"

const filePathPrefix = '/files'
const fileBaseUrl = baseUrl + filePathPrefix;

export const getFile = fileBaseUrl + '/'
export const getAllFiles = fileBaseUrl + '/all';
export const areAllRequiredUploaded = fileBaseUrl + 'all_uploaded'
export const updateFile = fileBaseUrl + '/update'
export const removeFile = fileBaseUrl + '/remove'