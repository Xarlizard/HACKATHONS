import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { SketchPicker } from 'react-color';

const CardEditControls = ({ onFontChange, onColorChange }) => {
  const [fontFamily, setFontFamily] = useState('Arial');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  
  const handleFontChange = (event) => {
    const newFont = event.target.value;
    setFontFamily(newFont);
    onFontChange(newFont);
  };
  
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    onColorChange(color.hex);
  };
  
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };
  
  const resetColor = () => {
    setSelectedColor(null);
    onColorChange(null);
  };
  
  return (
    <Box sx={{ mb: 3 }} data-testid="card-edit-controls">
      <FormControl sx={{ minWidth: 200, mr: 2 }}>
        <InputLabel id="font-select-label">Font Style</InputLabel>
        <Select
          labelId="font-select-label"
          value={fontFamily}
          onChange={handleFontChange}
          label="Font Style"
          data-testid="font-select"
        >
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Roboto">Roboto</MenuItem>
          <MenuItem value="Courier New">Courier New</MenuItem>
        </Select>
      </FormControl>
      
      <Button 
        variant="contained" 
        onClick={toggleColorPicker}
        sx={{ mr: 1 }}
        data-testid="toggle-color-picker"
      >
        {showColorPicker ? 'Hide Color Picker' : 'Change Background Color'}
      </Button>
      
      {selectedColor && (
        <Button 
          variant="outlined" 
          onClick={resetColor}
          data-testid="reset-color"
        >
          Reset to Default Color
        </Button>
      )}
      
      {showColorPicker && (
        <Box sx={{ mt: 2, position: 'relative', zIndex: 2 }}>
          <SketchPicker 
            color={selectedColor || '#000000'} 
            onChange={handleColorChange}
            data-testid="color-picker"
          />
        </Box>
      )}
    </Box>
  );
};

export default React.memo(CardEditControls);
