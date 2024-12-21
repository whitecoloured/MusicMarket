import { Table } from "@chakra-ui/react"

function CharacteristicsTable()
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
                <Table.Row>
                    <Table.Cell>Наименование 1</Table.Cell>
                    <Table.Cell>Описание 1</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Наименование 2</Table.Cell>
                    <Table.Cell>Описание 2</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Наименование 3</Table.Cell>
                    <Table.Cell>Описание 3</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table.Root>
    )
}

export default CharacteristicsTable;