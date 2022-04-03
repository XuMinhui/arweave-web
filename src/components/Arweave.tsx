import { Box, Button, Divider, Stack, styled } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Axios } from '../actions/Axios';
import { getObjectURL } from '../utils/file';
import ImgMediaCard, { ImgMediaCardProps } from './ImageCard';
import { WrapperArweave } from './WrapperArweave';

const DEFAULE_IMG = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBg8SBw4NDQ0NEA0QDw4PEBAPDQ4NFhEWFxUSExMYKCggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKcBLwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAECAwcF/8QAMRABAAEDAQUFBwQDAAAAAAAAAAECAxEEEiExUXETFGGBkSIyNEFCkrEjoaLRUnLB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APs4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5uVbFEzxwknWTPu0x+8gtEO3dr4RMeWG9hcr9+fWcgrm5FPGYjzh51amiPnno8o0X+VXpD0p0lMccz5g4q1sfTEz1xDjvkzMYiIjPVVFmmnhTH5Ta6nGzMeMAsHNudq3E84h0AAAAAAAAAAAAAAAAAAAAAAAAAAAADK42qJjnEpNBO+qOkrEWn9jVzH+0A9tVem1jYxvzxeHea+Ueku9f9Pm29em1bo2PnAPPvVfKPSTvVfKPSXdFd2unNMRj8vOdVXE78egN71Xyj0lxdvVXacVR47olve6/D0b3uvw9AKNRVRTEREbvCXpZ1NVy7EVRG9ljU1V3YirGJ8HNv46etQLgAAAAAAAAAAAAAAAAAAAAAAAAAAAEV32NbE85iVqPXRiuJjkDdf9Pm51fuUdP6brZzFHjE/8c6v3KOgPSzqqabURVmJjdw4pLlW3XM85Kbc1R7MTOGU0zXVinfMg23RNyrFKu5pI7P2Pej93tYsxZo3cZ4y9AfnaWMaiPP8ADu38dPWpTNn9aKqd3HPjuTWvjp61AuAAAAAAAAAAAAAAAAAAAAAAAAAAAATa6P04nlKlxdt9pRidwIbtcVW6McYicq5sxdina4RHDmmv6fs8bGas5y2L1yI3RP2gtiNmMU7oZFERVmIjM/NH29zlP2ydvc5T9sguEPb3OU/bJ3i5y/jILkNr42etR3i5y/jLNPEzqc1RMZzPCQXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3BsyAGDAAYMABhmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q=='
const ARWEAVE_HISTORY_COOKIE = 'ARWEAVE_HISTORY_COOKIE'

const Input = styled('input')({
    display: 'none',
});

enum LoadingStatus {
    Puste = '',
    Uploading = 'Uploading，please wait...',
    UploadSuccess = 'Success',
    UploadError = 'Error'
}

export const Arweave = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileInfo, setFileInfo] = useState<any>()
    const [image, setImage] = useState('')
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.Puste)
    const [fileList, setFileList] = useState<ImgMediaCardProps[]>([])

    useEffect(() => {
        const historyList = localStorage.getItem(ARWEAVE_HISTORY_COOKIE)
        if (historyList) {
            const list = JSON.parse(historyList)
            setFileList(list)
        }
    }, [])

    const handleFileChange = () => {
        const file = fileInputRef?.current?.files?.[0]
        if (file) {
            setFileInfo({
                fileName: file.name,
                fileType: file.type,
                fileSize: Number(file.size / 1000).toFixed(2)
            })

            const fileSrc = getObjectURL(file)
            setImage(fileSrc)
        } else {
            alert('file format error')
        }
    }

    const handleUpload = useCallback(() => {
        const files = fileInputRef?.current?.files
        const rawFile = files?.[0]
        if (!rawFile) return console.error('raw file is null')
        let formData = new FormData()
        formData.append("file", rawFile)
        setLoadingStatus(LoadingStatus.Uploading)
        Axios.post('/arweave/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            const fileRes = {
                name: rawFile.name,
                type: rawFile.type,
                size: rawFile.size / 1000,
                link: res.data.fileSrc
            }
            setLoadingStatus(LoadingStatus.UploadSuccess)
            const list = [fileRes, ...fileList]
            setFileList(list)
            localStorage.setItem(ARWEAVE_HISTORY_COOKIE, JSON.stringify(list))
        }).catch((err) => {
            setLoadingStatus(LoadingStatus.UploadError)
            console.error(err)
        }).finally(() => {

        })
    }, [fileList])

    return (
        <WrapperArweave>
            <Box mt={'20px'}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input ref={fileInputRef} accept="image/*" id="contained-button-file" type="file" onChange={handleFileChange} />
                        <div className="btnGroup">
                            <Button variant="contained" component="span">
                                Select File
                            </Button>
                            <Button aria-disabled={loadingStatus === LoadingStatus.Uploading} onClick={handleUpload} disabled={!fileInfo} variant="contained" component="button">
                                Upload Submit
                            </Button>
                            {loadingStatus && <p>{loadingStatus}</p>}
                        </div>
                    </label>

                    <img src={image} alt="" className='image' onError={() => {
                        setImage(DEFAULE_IMG)
                    }} />

                    <div className='infoBox'>
                        {fileInfo ? <>
                            <h3>file info</h3>
                            <p>⭐️ {fileInfo?.fileName}</p>
                            <p>⭐️ {fileInfo?.fileType}</p>
                            <p>⭐️ {fileInfo?.fileSize}K</p>
                        </> : <p>未选择文件</p>}
                    </div>

                    <div className='uploadBox'>

                    </div>
                </Stack>
                <Divider sx={{ margin: '20px 0' }} />

                <div className='showList'>
                    {!fileList.length && <span>No Data</span>}
                    {fileList.map(item => {
                        return <ImgMediaCard {...item} key={item.name + item.link} />
                    })}
                </div>
            </Box>
        </WrapperArweave>
    )
}
