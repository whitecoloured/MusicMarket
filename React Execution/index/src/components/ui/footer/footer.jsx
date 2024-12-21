import { Flex, Text } from '@chakra-ui/react';
import './footer.css'

function Footer()
{
    return(
        <footer>
            <div style={{height:'10px'}}>

            </div>
            <div className='textContainer'>
                <Text fontFamily={'"Inter", sans-serif'} fontSize={'30px'} color={'white'} marginBottom={'3%'} letterSpacing={'3px'}>
                    MusicMarket 2024
                </Text>
                <Flex>
                    <Text fontFamily={'"Inter", sans-serif'} fontSize={'18px'} color={'white'} marginRight={'15%'} letterSpacing={'3px'}>
                        Почта:<br/>
                        musicmarketadmin@mail.ru
                    </Text>
                    <Text fontFamily={'"Inter", sans-serif'} fontSize={'18px'} color={'white'} marginRight={'15%'} letterSpacing={'3px'}>
                        Телефон:<br/>
                        +375449203810
                    </Text>
                    <Text fontFamily={'"Inter", sans-serif'} fontSize={'18px'} color={'white'} letterSpacing={'3px'}>
                        Адрес:<br/>
                        ул. Интернациональная, 15
                    </Text>
                </Flex>
            </div>
        </footer>
    )
}

export default Footer;