import { Flex, Button, Text, Input } from "@chakra-ui/react";

function CharacteristicRow({index, chars, setChars})
{

    function onChangeChar(e)
    {
        const {name, value}=e.target
        setChars(prevState=> ({...prevState, characteristics: chars.map((char, i)=>
            {
                if (i===index)
                {
                    return {...char, [name]:value}
                }
                return char;
            }
            )}))
    }

    function onRowDelete()
    {
        setChars(prevState=> ({...prevState,characteristics:chars.filter((_,i)=> index!==i)}))
    }

    return(
        <Flex marginBottom={'2%'} >
            <Text fontWeight={'bold'} fontSize={'2xl'} marginTop={'10px'} marginRight={'30px'}> Название:</Text>
            <Input name="key" value={chars[index]?.key} variant={'subtle'} w={'20%'} marginRight={'30px'} placeholder="Название характеристики" onChange={(e)=> onChangeChar(e)}/>
            <Text fontWeight={'bold'} fontSize={'2xl'} marginTop={'10px'} marginRight={'30px'}>Описание:</Text>
            <Input name="value" value={chars[index]?.value} variant={'subtle'} w={'40%'} marginRight={'30px'} placeholder="Описание характеристики" onChange={(e)=> onChangeChar(e)}/>
            <Button colorPalette={'red'} w={'10%'} onClick={()=> onRowDelete()}>Удалить</Button>
        </Flex>
    )
}
export default CharacteristicRow;