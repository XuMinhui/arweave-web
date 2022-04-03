import styled from 'styled-components'

export const WrapperArweave = styled.div`
    
    .image{
        width: 200px;
        min-height: 100px;
        border: 1px solid #ccc;
    }

    .btnGroup{
        display: flex;
        flex-direction: column;
        align-items: center;

        &>span {
            width: 160px;
            margin-bottom: 20px;
        }

        &>button {
            width: 160px;
        }
    }

    .infoBox{
        padding: 20px;
    }

    .uploadBox{

    }

    .showList{
        display: flex;
        /* justify-content: space-between; */
        flex-wrap: wrap;

        &>div {
            width: 200px;
            height: 260px;
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
`