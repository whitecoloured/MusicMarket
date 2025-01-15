import { Card, Flex, Text, Image, Textarea, Button } from "@chakra-ui/react";
import Star from '../stars/Star.png'
import FilledStar from '../stars/FilledStar.png'
import Pencil from '../../../assets/Pencil.png'
import RedCross from '../../../assets/RedCross.png'
import { useState } from "react";

function ReviewCardFirstVariant({id,name, surname, mark, reviewDesc, reviewDate, doesBelongToUser, setConfirmationOpen, onReviewEdit})
{

    const [isEditing, setIsEditing]=useState(false);

    const [editableData, setEditableData]=useState({
        mark:mark,
        reviewDesc:reviewDesc
    })

    let stars=[];
    for(let i=1; i<6; i++)
    {
        if (i>mark)
        {
            stars.push(<Image key={i} h={'30px'} src={Star}/>);
        }
        else stars.push(<Image key={i} h={'30px'} src={FilledStar}/>)
    }
    
    function onCancelEditing()
    {
        setIsEditing(false);
        setEditableData({
            mark:mark,
            reviewDesc:reviewDesc
        })
    }

    return(
        <Card.Root marginBottom={'2%'}>
            <Card.Header>
                <Flex justifyContent={'space-between'}>
                    <Text fontSize={'20px'} fontWeight={'bold'}>
                        {name} {surname}
                    </Text>
                    <Flex>
                        {!isEditing?
                        stars:
                        Array(5).fill(null).map((_,index)=>
                            <Image key={index} h={'30px'} cursor={'pointer'} src={index<editableData.mark?FilledStar:Star} onClick={()=> setEditableData({...editableData, mark:index+1})}/>
                        )}
                    </Flex>
                </Flex>
            </Card.Header>
            <Card.Body>
                {isEditing?
                <Textarea defaultValue={reviewDesc||""} variant={'subtle'} resize={'none'} onChange={(e)=> setEditableData({...editableData, reviewDesc:e.target.value})}/>:
                reviewDesc?reviewDesc?.length>90?`${reviewDesc?.substring(0,90)}...`
                :reviewDesc:"Нет описания"}
            </Card.Body>
            <Card.Footer>
                {doesBelongToUser&&
                <>
                    {!isEditing?
                    <Flex>
                        <Image h={'30%'} w={'30%'} src={Pencil} cursor={'pointer'} marginRight={'10%'} alt="Изменить" onClick={()=> setIsEditing(true)}/>
                        <Image h={'22%'} w={'22%'} src={RedCross} cursor={'pointer'} alt="Удалить" onClick={()=> setConfirmationOpen()}/>
                    </Flex>:
                    <>
                    <Button onClick={()=> onCancelEditing()}>Отменить</Button>
                    <Button colorPalette={'teal'} onClick={()=> {
                        onReviewEdit(editableData, id);
                        onCancelEditing();}}>Подтвердить</Button>
                    </>}
                </>}
                <Flex justifyContent={'flex-end'} w={'100%'}>
                    <Text fontSize={'13px'}>Дата: {reviewDate}</Text>
                </Flex>
            </Card.Footer>
        </Card.Root>
    )
}

export default ReviewCardFirstVariant;