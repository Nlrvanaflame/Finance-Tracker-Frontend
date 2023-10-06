export const recordListContainerStyle: React.CSSProperties = {
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  backgroundColor: '#4d5b7a',
   padding: '20px', 
   borderRadius: '8px',
   display: 'flex',
  
  };
  
  export const recordStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'auto auto auto auto',
    gridTemplateAreas: `
      "type type type type"
      "amount amount amount amount"
      "description description description description"
      "date date date date"
      "buttons buttons buttons buttons"
    `,
    width: 'calc(25% - 40px)',
    maxWidth: '450px',
    gap: '20px',
    padding: '10px',
    backgroundColor: '#5a678a',
    borderRadius: '5px',
    margin: '60px',
    color: 'white',
  };

  export const centeredContentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  };
  
  