// Procedurally generate a smooth, seamless wave path
function generateWavePath() {
    const width = 2880; // Double width for seamless looping (2x 1440)
    const height = 200; // Wave height
    const segmentWidth = 180; // Smaller segments for smoother curve
    const segments = width / segmentWidth;
    let path = `M0,${height / 2} `;

    // Generate a smooth sine-based wave
    for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        const y = height / 2 + Math.sin(i * 0.5) * 50; // Smaller amplitude
        const controlX = x - segmentWidth / 2;
        const controlY = height / 2 + Math.sin((i - 0.5) * 0.5) * 50;

        if (i === 0) {
            path += `C${controlX},${controlY} ${controlX},${controlY} ${x},${y} `;
        } else {
            path += `S${controlX},${controlY} ${x},${y} `;
        }
    }

    // Close the path without disrupting the wave shape
    path += `L${width},${height} L0,${height} Z`;
    return path;
}

// Apply the wave path and set up seamless animation
document.addEventListener('DOMContentLoaded', () => {
    const wavePath = document.getElementById('wave-path');
    const pathData = generateWavePath();
    wavePath.setAttribute('d', pathData);

    // Ensure fill is applied
    wavePath.style.fill = '#007bff'; // Reinforce fill color

    // Add seamless animation via CSS
    wavePath.style.animation = 'waveFlow 10s infinite linear';
});

// Define the keyframes for seamless looping
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes waveFlow {
        0% { transform: translateX(0); }
        100% { transform: translateX(-1440px); } /* Half the path width for seamless loop */
    }
`;
document.head.appendChild(styleSheet);