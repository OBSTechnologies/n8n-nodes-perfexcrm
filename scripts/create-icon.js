const sharp = require('sharp');

// Create a PNG icon that matches the PerfexCRM logo
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <rect width="60" height="60" fill="#ffffff" rx="8"/>
  <g transform="translate(10, 10)">
    <!-- P shape -->
    <rect x="3" y="5" width="10" height="30" fill="#484b52"/>
    <rect x="3" y="5" width="20" height="10" fill="#ec4899"/>
    <path d="M 13 5 L 23 5 Q 28 5 28 10 Q 28 15 23 15 L 13 15 Z" fill="#22c7ec"/>
  </g>
</svg>`;

// Convert SVG to PNG
sharp(Buffer.from(svg))
  .png()
  .resize(60, 60)
  .toFile('nodes/PerfexCrm/perfexcrm.png')
  .then(() => {
    console.log('Icon created successfully');
    // Also save to dist folder
    return sharp(Buffer.from(svg))
      .png()
      .resize(60, 60)
      .toFile('dist/nodes/PerfexCrm/perfexcrm.png');
  })
  .then(() => {
    console.log('Icon copied to dist folder');
  })
  .catch(err => {
    console.error('Error creating icon:', err);
  });