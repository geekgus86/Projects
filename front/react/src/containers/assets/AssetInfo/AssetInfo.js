import React from 'react'
import Avatar from '@material-ui/core/Avatar'

const styles = {
    assetAvatar: {
      fontWeight: "bold",
    }
}

const AssetInfo = (props) => {
  return (
    <React.Fragment>
        <Avatar  style={styles.assetAvatar} alt="Prensa" 
            src="https://i.ytimg.com/vi/wkyb81SK5bs/maxresdefault.jpg"
        />
        <span style={{  display: "flex", flexDirection: "column", marginLeft: 10 }}>
            <span style={{ fontWeight: 'bold' }}>{props.asset.name}</span>
            <span style={{ fontSize: '9px' }}>ENN</span>
        </span>
    </React.Fragment>
  )
}

export default AssetInfo