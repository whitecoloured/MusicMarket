import { Table } from "@chakra-ui/react"

function CharacteristicsTable({characteristics})
{
    return(
        <Table.Root marginBottom={'3%'} showColumnBorder>
            <Table.Header>
                <Table.Row>
                <Table.ColumnHeader textAlign={'center'}>Наименование</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={'center'}>Описание</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {characteristics?.map((char, index)=>
                <Table.Row key={index}>
                    <Table.Cell>{char?.key}</Table.Cell>
                    <Table.Cell>{char?.value}</Table.Cell>
                </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    )
}

export default CharacteristicsTable;