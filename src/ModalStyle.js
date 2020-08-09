export default function(height){
  return {
    content:{
        position:'relative',
        backgroundColor:'var(--madle-color)',
        borderRadius:10,
        width:400,
        height:height,
        padding:0,
        marginTop:50
      },
      overlay:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#2d3169c2',
      }
  }
}