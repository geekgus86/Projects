import React from 'react'

const styles = {
    toolAvatar: {
      fontWeight: "bold",
    }, 
    imgTool: {
        height: "60px",  
    }
}

const toolInfo = (props) => {

    if(props.tool!==null){
        return (
            <React.Fragment>
                <img  style={styles.imgTool} alt="Prensa" 
                    src="http://www.pgo-spain.com/img/c/28-category.jpg"
                />
                <span style={{  display: "flex", flexDirection: "column", marginLeft: 10 }}>
                    <span style={{ fontWeight: 'bold' }}>{props.tool.DescTool}</span>
                    <span style={{ fontSize: '9px' }}>ENN</span>
                </span>
            </React.Fragment>
        )
    }

    return null
}

export default toolInfo