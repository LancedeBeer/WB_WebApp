// Procedurally generate a smooth, seamless, infinite wave path
function generateWavePath() {
    const width = 2880; // Double width for seamless looping
    const height = 200; // Wave height (adjusted for mobile in CSS)
    const segmentWidth = 60; // Smooth segments
    const segments = width / segmentWidth;
    let path = `M-60,${height} `; // Start off-screen

    // Generate a repeating sine-based wave
    for (let i = 0; i <= segments + 1; i++) {
        const x = i * segmentWidth;
        const y = (height - 70 + Math.sin((i * 2 * Math.PI) / (segments / 2)) * 70); // Full height usage
        const controlX = x - segmentWidth / 2;
        const controlY = height - 70 + Math.sin(((i - 0.5) * 2 * Math.PI) / (segments / 2)) * 70;

        if (i === 0) {
            path += `C${controlX},${controlY} ${controlX},${controlY} ${x},${y} `;
        } else {
            path += `S${controlX},${controlY} ${x},${y} `;
        }
    }

    // Close the path fully
    path += `L${width + 60},${height} L-60,${height} Z`;
    return path;
}

// Prevent overlap between .container and .WaveContainer
function preventContainerOverlap() {
    const container = document.querySelector('.container');
    const waveContainer = document.querySelector('.WaveContainer');
    const viewportHeight = window.innerHeight;
    const minGap = 1; // Minimum gap between container and wave

    // Get dimensions and positions
    const containerRect = container.getBoundingClientRect();
    const waveHeight = waveContainer.offsetHeight; // 200px desktop, 150px mobile
    const containerBottom = containerRect.bottom + window.scrollY;

    // Desired wave position: 50px below container, but adjust if too low
    let desiredWaveBottom = containerBottom + waveHeight + minGap - viewportHeight;
    let waveBottom = Math.max(0, Math.min(desiredWaveBottom, viewportHeight - waveHeight - minGap));

    // Set wave position
    waveContainer.style.bottom = `${waveBottom}px`;

    // Adjust container bottom margin to ensure no overlap
    const containerMarginBottom = waveHeight + minGap + waveBottom;
    container.style.marginBottom = `${containerMarginBottom}px`;
}

// Apply wave path, animation, and overlap prevention
document.addEventListener('DOMContentLoaded', () => {
    const wavePath = document.getElementById('wave-path');
    const pathData = generateWavePath();
    wavePath.setAttribute('d', pathData);

    // Ensure fill is applied
    wavePath.style.fill = '#007bff';
    wavePath.style.stroke = 'none';

    // Add seamless animation
    wavePath.style.animation = 'waveFlow 12s infinite linear';

    // Prevent overlap initially and on resize
    preventContainerOverlap();
    window.addEventListener('resize', preventContainerOverlap);
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