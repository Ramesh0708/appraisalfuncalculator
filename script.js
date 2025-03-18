document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded at', new Date().toLocaleTimeString());

    const form = document.getElementById('appraisalForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted');

            const lastCtc = parseFloat(document.getElementById('lastCtc').value);
            const currentCtc = parseFloat(document.getElementById('currentCtc').value);
            const position = document.getElementById('position').value.trim();
            const location = document.getElementById('location').value.trim();

            if (isNaN(lastCtc) || isNaN(currentCtc) || lastCtc <= 0 || currentCtc < 0) {
                alert('Please enter valid positive CTC values!');
                return;
            }

            const hike = ((currentCtc - lastCtc) / lastCtc) * 100;
            const resultDiv = document.getElementById('appraisalResult');
            const hikePercentage = document.getElementById('hikePercentage');
            const gauge = document.getElementById('hikeGauge');
            const feedback = document.getElementById('appraisalFeedback');
            const shareButton = document.getElementById('shareAppraisal');

            // Slot machine effect
            let spins = 0;
            const spinInterval = setInterval(() => {
                hikePercentage.textContent = (Math.random() * 100).toFixed(2);
                spins++;
                if (spins >= 10) {
                    clearInterval(spinInterval);
                    hikePercentage.textContent = hike.toFixed(2);
                    hikePercentage.style.animation = 'none';
                    shareButton.style.display = 'inline-block';

                    // Gauge animation
                    gauge.style.setProperty('--gauge-width', `${Math.min(hike, 100)}%`);
                    gauge.innerHTML = `<div style="width: ${Math.min(hike, 100)}%; background: #28a745; height: 100%; border-radius: 10px;"></div>`;
                }
            }, 100);

            // Confetti blast
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            resultDiv.style.display = 'block';
            resultDiv.style.opacity = '0';
            setTimeout(() => resultDiv.style.opacity = '1', 10);

            let feedbackText;
            if (hike < 10) feedbackText = "Oof, below average—time to hustle!";
            else if (hike < 15) feedbackText = "Solid average—steady wins!";
            else if (hike < 20) feedbackText = "Nice one—above the curve!";
            else feedbackText = "Jackpot! You’re killing it!";
            feedback.textContent = feedbackText + (position && location ? ` (For ${position} in ${location})` : '');

            shareButton.onclick = () => {
                const shareText = `I scored a ${hike.toFixed(2)}% appraisal hike! Spin yours at: https://appraisal-fun-calculator.netlify.app/`;
                navigator.clipboard.writeText(shareText).then(() => alert('Copied to clipboard!'));
            };
        });
    }

    // CTC visibility toggles
    document.getElementById('toggleLastCtc').addEventListener('click', () => toggleVisibility('lastCtc'));
    document.getElementById('toggleCurrentCtc').addEventListener('click', () => toggleVisibility('currentCtc'));

    function toggleVisibility(id) {
        const input = document.getElementById(id);
        const button = input.nextElementSibling;
        if (input.type === 'password') {
            input.type = 'number';
            button.textContent = 'Hide';
        } else {
            input.type = 'password';
            button.textContent = 'Show';
        }
    }
});