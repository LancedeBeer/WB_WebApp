// Procedurally generate a smooth, seamless, infinite wave path
function generateWavePath() {
    const width = 2880; // Double width for seamless looping
    const height = 200; // Wave height
    const segmentWidth = 60; // Smooth segments
    const segments = width / segmentWidth;
    let path = `M-60,${height} `; // Start slightly off-screen for continuity

    // Generate a repeating sine-based wave
    for (let i = 0; i <= segments + 1; i++) { // Extra segment for overlap
        const x = i * segmentWidth;
        const y = height - 60 + Math.sin((i * 2 * Math.PI) / (segments / 2)) * 60;
        const controlX = x - segmentWidth / 2;
        const controlY = height - 60 + Math.sin(((i - 0.5) * 2 * Math.PI) / (segments / 2)) * 60;

        if (i === 0) {
            path += `C${controlX},${controlY} ${controlX},${controlY} ${x},${y} `;
        } else {
            path += `S${controlX},${controlY} ${x},${y} `;
        }
    }

    // Close the path to fill below the wave
    path += `L${width + 60},${height} L-60,${height} Z`; // Extend beyond for seamlessness
    return path;
}

// Apply the wave path and set up seamless animation
document.addEventListener('DOMContentLoaded', () => {
    const wavePath = document.getElementById('wave-path');
    const pathData = generateWavePath();
    wavePath.setAttribute('d', pathData);

    // Ensure fill is applied
    wavePath.style.fill = '#007bff';
    wavePath.style.stroke = 'none';

    // Add seamless animation
    wavePath.style.animation = 'waveFlow 12s infinite linear';
});

// Define the keyframes for seamless looping
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes waveFlow {
        0% { transform: translateX(0); }
        100% { transform: translateX(-1440px); } /* Half the path width */
    }
`;
document.head.appendChild(styleSheet);