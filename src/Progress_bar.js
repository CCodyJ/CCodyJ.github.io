import React from 'react'
  
const ProgressBar = ({bgcolor,progress,height}) => {
     
    const parentDivStyle = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        }
      
      const childDivStyle = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'right'
      }
      
      const progressTextStyle = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }
        
    return (
        <div style={parentDivStyle} className="progress-bar-container">
        <div style={childDivStyle} className="progress-bar-fill">
          <span style={progressTextStyle}>{`${progress}%`}</span>
        </div>
    </div>
    )
}
  
export default ProgressBar;