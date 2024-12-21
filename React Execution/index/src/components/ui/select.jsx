function Select({style, children})
{
    const {height, width, bgColor} =style?style:{height:'30px',width:'20%',bgColor:'whitesmoke'}
    return(
        <select style={{height:height?height:'30px',width:width?width:'20%', backgroundColor:bgColor?bgColor:'whitesmoke', borderRadius:'10px 10px 10px 10px'}}>
            {children}
        </select>
    )
}

export default Select;