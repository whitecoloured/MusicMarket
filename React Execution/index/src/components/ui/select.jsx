function Select({style, onChange, children})
{
    const {height, width, bgColor, marginBottom} =style?style:{height:'30px',width:'20%',bgColor:'whitesmoke', marginBottom:'0px'}
    return(
        <select onChange={()=>onChange&&onChange()} style={{height:height?height:'30px',width:width?width:'20%', backgroundColor:bgColor?bgColor:'whitesmoke', borderRadius:'10px 10px 10px 10px', marginBottom:marginBottom?marginBottom:'0px'}}>
            {children}
        </select>
    )
}

export default Select;