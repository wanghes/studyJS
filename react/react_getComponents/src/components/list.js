import React from 'react';
import list from './listStyle';
const styles = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

styles.content3 = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center',
  background:"#666"
}
const List = (props) =>{
  return (
    <div style={styles.content3}><h2>List</h2></div>
  )
}
export default List;
