import { Button } from "@chakra-ui/react";

function SquarePage({value, setPage})
{
    return(
        <Button colorPalette={'cyan'} marginRight={'1%'} onClick={()=>setPage()}>
            {value}
        </Button>
    )
}

export default SquarePage;