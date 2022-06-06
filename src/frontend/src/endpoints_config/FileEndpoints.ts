import baseUrl from './base';

const filePathPrefix = '/files';
export const fileBaseUrl = baseUrl + filePathPrefix;

export const getFile = '/';
export const getAllFiles = '/all';
export const ready = '/ready';
export const updateFile = '/update';
export const clearFile = '/clear';
export const clearAll = '/clear_all';
export const prepareFiles = '/prepare';
export const preprocess = '/preprocess';
export const uploadLayout = '/upload_layout';
export const uploadBookmarks = '/upload_bookmarks';
export const getOutputFolder = '/output_folder';
export const getDataFolder = '/data_folder';
export const updateOutputFolder = '/update_output_folder';
export const updateDataFolder = '/update_data_folder';
export const gfaPhenoMatch = '/gfa_pheno_match';
export const clearFolder = '/clear_folder';
