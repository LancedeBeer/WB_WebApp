// Procedurally generate a smooth, seamless wave path
function generateWavePath() {
    const width = 11520; // Very wide (8x typical screen width) for seamless looping
    const height = 300; // Wave height
    const segmentWidth = 240; // Width of each wave segment
    const segments = width / segmentWidth;
    let path = `M0,${height / 2} `; // Start at middle height

    // Generate smooth sine-based wave with consistent amplitude
    for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        const y = height / 2 + Math.sin(i * 0.3) * 100; // Smooth sine wave with 100px amplitude
        const controlX = x - segmentWidth / 4;
        const controlY = height / 2 + Math.sin((i - 0.5) * 0.3) * 100; // Smooth control point

        if (i === 0) {
            path += `C${controlX},${controlY} ${controlX},${controlY} ${x},${y} `;
        } else {
            path += `S${controlX},${controlY} ${x},${y} `;
        }
    }

    path += `L${width},${height} L0,${height} Z`; // Close the path
    return path;
}

// Apply the wave path and set up seamless animation
document.addEventListener('DOMContentLoaded', () => {
    const wavePath = document.getElementById('wave-path');
    wavePath.setAttribute('d', generateWavePath());

    // Add seamless animation via CSS
    wavePath.style.animation = 'waveFlow 20s infinite linear';
});

// Define the keyframes dynamically for seamless looping
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes waveFlow {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
`;
document.head.appendChild(styleSheet);