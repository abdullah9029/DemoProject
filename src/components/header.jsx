import React, { useState } from 'react'


export default function Header() {
  const [showDialog, setShowDialog] = useState(false);
  const [horseType, setHorseType] = useState('');
  const [horseTypes, setHorseTypes] = useState([]);
  const [buttonState, setButtonState] = useState(true);
  const [editText, setEditText] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {  
      setHorseType(e.target.value); 
      console.log(e.target.value)
      setButtonState(false);  
      // {horseType.length==0 ? setButtonState(true) : setButtonState(false)}
      setButtonState(e.target.value == '');
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (horseType.trim()) {
      if (editIndex !== null) {
        // Edit existing horse type
        const updatedTypes = [...horseTypes];
        updatedTypes[editIndex] = horseType;
        setHorseTypes(updatedTypes);
        setEditIndex(null);
      } else {
        // Add new horse type
        setHorseTypes([...horseTypes, horseType]);
      }
      setHorseType('');        
      setShowDialog(false);
      setButtonState(true);
    }
  };

  const handleCancel = () =>
  {    
    setHorseType('');
    setButtonState(true)
    setShowDialog(false)
    setEditIndex(null);
  }

  const handleDelete = (index) => {
    const updatedTypes = horseTypes.filter((_, i) => i !== index);
    setHorseTypes(updatedTypes);
  };

  const handleEdit = (index) => {
    setHorseType(horseTypes[index]);
    setEditIndex(index);
    setShowDialog(true);
    setButtonState(false);
  };

  return (
    <div>
      <div className="header-container parentClass">
        <h1>Horse Type</h1>
        <button 
          className="btn btn-primary AddBtn"
         
          onClick={() => setShowDialog(true)}
        >
          Add Horse Type
        </button>
      </div>

      {showDialog && (
        <div className='DialogueBox'>
          <form onSubmit={handleSubmit}>
            <h2>{editIndex !== null ? 'Edit Horse Type' : 'Add Horse Type'}</h2>
            <input
              type="text"
              value={horseType}
              onChange={handleChange}
              placeholder="Enter horse type"
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                marginBottom: '1rem'
              }}
            />
            <div style={{display: 'flex', gap: '1rem'}}>
              <button disabled={buttonState} type="submit" className="btn btn-primary">
                {editIndex !== null ? 'Update' : 'Submit'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <ul >
        {horseTypes.map((type, index) => (
          
          
          <li style={{ padding: '1rem', backgroundColor: 'green' }} key={index}>{type}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => handleDelete(index)}>
              delete
              </button>
               <button onClick={() => handleEdit(index)}>
              edit
            </button>
            </div>
            </li>
        ))}
      </ul>
    </div>
  );
}
