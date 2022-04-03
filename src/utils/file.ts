export const getObjectURL = (file: any) => {
    var url = null;
    // @ts-ignore
    if (window.createObjcectURL !== undefined) {
        // @ts-ignore
        url = window.createOjcectURL(file);
    } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    
    return url;
}