// Procedurally generate a very smooth, seamless wave path
function generateWavePath() {
    const width = 11520; // Wide enough for seamless looping (8x typical screen width)
    const height = 200; // Wave height
    const segmentWidth = 156; // Segment width
    const segments = width / segmentWidth;
    let path = `M0,${height / 2} `; // Start at middle height

    // Generate a smooth sine-based wave with smaller amplitude
    for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        const y = height / 2 + Math.sin(i * 0.2) * 50; // Smaller amplitude (50px)
        const controlX = x - segmentWidth / 2;
        const controlY = height / 2 + Math.sin((i - 0.5) * 0.2) * 50; // Consistent control point

        if (i === 0) {
            path += `C${controlX},${controlY} ${controlX},${controlY} ${x},${y} `;
        } else {
            path += `S${controlX},${controlY} ${x},${y} `; // Smooth curve with single control point
        }
    }

    path += `L${width},${height} L0,${height} Z`; // Close the path
    return path;
}

// Apply the wave path and set up seamless animation
document.addEventListener('DOMContentLoaded', () => {
    const wavePath = document.getElementById('wave-path');
    const pathData = generateWavePath();
    wavePath.setAttribute('d', pathData);

    // Add seamless animation via CSS
    wavePath.style.animation = 'waveFlow 20s infinite linear';

    // Ensure the path loops perfectly by matching start and end
    const halfWidth = 11520 / 2;
    const seamlessPath = pathData.replace(`M0,${height / 2}`, `M${-halfWidth},${height / 2}`) + pathData.slice(1);
    wavePath.setAttribute('d', seamlessPath);
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