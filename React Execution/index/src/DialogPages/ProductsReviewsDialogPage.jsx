import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog.jsx"
import { Text, Flex, Button } from "@chakra-ui/react"
import Select from "../components/ui/select"
import ReviewCardFirstVariant from "../components/ui/reviewcards/reviewcardfirstvariant"

function ProductsReviewsDialogPage()
{
    let reviews=[
        <ReviewCardFirstVariant mark={3}/>,
        <ReviewCardFirstVariant mark={2}/>,
        <ReviewCardFirstVariant mark={5}/>,
        <ReviewCardFirstVariant mark={2}/>,
        <ReviewCardFirstVariant mark={5}/>
    ]
    return(
        <DialogRoot size="cover" placement="center" scrollBehavior={'inside'}>
            <DialogTrigger asChild>
                <Button size={'xl'} w={'20%'} backgroundColor={'#2287B5'}>Все отзывы</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Text fontWeight={'bold'}>Все отзывы о продукте</Text>
                    </DialogTitle>
                    <Flex justifyContent={'flex-end'}>
                        <Select style={{height:'35px', width:'30%' }}>
                            <option value={[false, 'date']}>Сортировать по дате {'(по убыванию)'}</option>
                            <option value={[true,'date']}>Сортировать по дате {'(по возрастанию)'}</option>
                            <option value={[false, 'mark']}>Сначала положительные</option>
                            <option value={[true, 'mark']}>Сначала отрицательные</option>
                        </Select>
                    </Flex>
                    <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                {reviews}
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}

export default ProductsReviewsDialogPage;