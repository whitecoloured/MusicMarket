import { Button } from "@chakra-ui/react";

function SquarePage({value})
{
    return(
        <Button colorPalette={'cyan'} marginRight={'1%'}>
            {value}
        </Button>
    )
}

export default SquarePage;