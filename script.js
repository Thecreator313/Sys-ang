document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const canvas = document.getElementById('posterCanvas');
  const ctx = canvas.getContext('2d');
  const downloadBtn = document.getElementById('downloadBtn');

  // Use the fixed background image
  const backgroundImage = new Image();
  backgroundImage.src = 'assets/images/background.jpg';
  backgroundImage.onload = function() {
    // Draw background once loaded
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };

  // Default settings (will be overridden by saved settings if available)
  let settings = {
    numberX: 90,
    numberY: 300,
    numberFontSize: 50,
    textX: 75,
    textY: 488,
    textFontSize: 40
  };

  // Load saved settings if available
  const savedSettings = JSON.parse(localStorage.getItem('posterSettings'));
  if (savedSettings) {
    settings = { ...settings, ...savedSettings };
  }
  
  generateBtn.addEventListener('click', function() {
    const number = document.getElementById('posterNumber').value;
    const placeName = document.getElementById('placeName').value;
    
    if (!number || !placeName) {
      alert('Please enter both number and place name.');
      return;
    }
    
    // Redraw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    // Ensure custom fonts are loaded before drawing text
    document.fonts.ready.then(() => {
      // Draw the number using the custom font "NumberFont"
      ctx.font = `${settings.numberFontSize}px NumberFont`;
      ctx.fillStyle = 'rgba(0,116,12,1.0)';
      ctx.fillText(number, settings.numberX, settings.numberY);
      
      // Draw the place name using the custom font "PlaceFont"
      ctx.font = `${settings.textFontSize}px PlaceFont`;
      ctx.fillStyle = 'rgba(0,116,12,1.0)';
      ctx.fillText(placeName, settings.textX, settings.textY);
      
      // Show download button after drawing is complete
      downloadBtn.style.display = 'inline-block';
    });
  });
  
  downloadBtn.addEventListener('click', function() {
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'poster.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});
