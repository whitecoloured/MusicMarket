import { Flex, Button, Text, Input } from "@chakra-ui/react";

function CharacteristicRow({index, chars, setChars})
{

    function onChangeKey(e)
    {
        setChars(
            chars.map((char, i)=>
            {
                if (i===index)
                {
                    return {...char, key:e.target.value}
                }
                return char;
            }
            )
        )
    }

    function onChangeValue(e)
    {
        setChars(
            chars.map((char, i)=>
            {
                if (i===index)
                {
                    return {...char, value:e.target.value}
                }
                return char;
            }
            )
        )
    }

    function onRowDelete()
    {
        setChars(
            chars.filter((_,i)=> index!==i)
            )   
    }

    return(
        <Flex marginBottom={'2%'} >
            <Text fontWeight={'bold'} fontSize={'2xl'} marginTop={'10px'} marginRight={'30px'}> Название:</Text>
            <Input value={chars[index]?.key} variant={'subtle'} w={'20%'} marginRight={'30px'} placeholder="Название характеристики" onChange={(e)=> onChangeKey(e)}/>
            <Text fontWeight={'bold'} fontSize={'2xl'} marginTop={'10px'} marginRight={'30px'}>Описание:</Text>
            <Input value={chars[index]?.value} variant={'subtle'} w={'40%'} marginRight={'30px'} placeholder="Описание характеристики" onChange={(e)=> onChangeValue(e)}/>
            <Button colorPalette={'red'} w={'10%'} onClick={()=> onRowDelete()}>Удалить</Button>
        </Flex>
    )
}
export default CharacteristicRow;