import React from 'react'

const styles = {
    imgTool: {
        height: "60px",  
        marginLeft: "1%", 
        maxWidth: "69%" 
    },
    containerLeft: {
        display: "flex", 
        flexDirection: "column", 
        maxWidth: "30%" 
    }, 
    toolTitle:{
        fontWeight: 'bold', 
        fontSize: '24px', 
        fontFamily: "GothamRounded"
    },
    toolSubtitle:{
        fontSize: '9px', 
    }
}

const ToolInfo = (props) => {
  return (
    <React.Fragment>
       <span style={styles.containerLeft}>
            <span style={styles.toolTitle}>{props.tool.DescTool}</span>
            <span style={styles.toolSubtitle}>SCHULER A</span>
        </span>
        <img  style={styles.imgTool} alt="Prensa" 
            src="http://www.pgo-spain.com/img/c/28-category.jpg"
        />
    </React.Fragment>
  )
}

export default ToolInfo