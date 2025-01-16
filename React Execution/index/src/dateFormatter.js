import dayjs from "dayjs";

export const formattedDate =(date)=>
{
    return date?dayjs(date).format('DD.MM.YYYY HH:mm'):"";
}