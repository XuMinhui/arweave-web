export function dataURItoBlob(dataURI: string) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

export const fileToBase64: (file: File) => Promise<string> = async (file) => {
    let base64Str = ''
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (result) => {
        base64Str = result.target?.result as string
    }

    return new Promise(async (resolve) => {
        setTimeout(() => {
            resolve(base64Str)
        }, 200)
    })
}

export const blobToBase64: (blob: Blob) => Promise<ArrayBuffer | null> = async (blob) => {
    let fileBuffer: ArrayBuffer | null = null
    const reader = new FileReader()
    reader.readAsArrayBuffer(blob)

    reader.onload = (result) => {
        console.log(result)
        fileBuffer = result.target?.result as ArrayBuffer
    }

    return new Promise(async (resolve) => {
        setTimeout(() => {
            resolve(fileBuffer)
        }, 200)
    })
}