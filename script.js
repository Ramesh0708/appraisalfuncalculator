document.addEventListener('DOMContentLoaded', () => {
    console.log('HikeBoom loaded at', new Date().toLocaleTimeString());

    const form = document.getElementById('appraisalForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Boom triggered!');

            const lastCtc = parseFloat(document.getElementById('lastCtc').value);
            const currentCtc = parseFloat(document.getElementById('currentCtc').value);
            const position = document.getElementById('position').value.trim();
            const location = document.getElementById('location').value.trim();

            if (isNaN(lastCtc) || isNaN(currentCtc) || lastCtc <= 0 || currentCtc < 0) {
                alert('Gimme valid cash, fam!');
                return;
            }

            const hike = ((currentCtc - lastCtc) / lastCtc) * 100;
            const resultDiv = document.getElementById('appraisalResult');
            const hikePercentage = document.getElementById('hikePercentage');
            const gauge = document.getElementById('hikeGauge');
            const feedback = document.getElementById('appraisalFeedback');
            const shareButton = document.getElementById('shareAppraisal');

            // Slot machine madness
            let spins = 0;
            const spinInterval = setInterval(() => {
                hikePercentage.textContent = (Math.random() * 100).toFixed(2);
                spins++;
                if (spins >= 15) {
                    clearInterval(spinInterval);
                    hikePercentage.textContent = hike.toFixed(2);
                    hikePercentage.classList.remove('slot'); // Stop spinning
                    shareButton.style.display = 'inline-block';

                    // Gauge boom
                    const gaugeWidth = Math.min(hike, 100);
                    gauge.innerHTML = `<div style="width: ${gaugeWidth}%; background: linear-gradient(to right, #ffcc00, #ff00cc); height: 100%; border-radius: 10px;"></div>`;
                }
            }, 100);

            // Confetti explosion
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.5 },
                colors: ['#ff00cc', '#3333ff', '#ffcc00']
            });

            resultDiv.style.display = 'block';
            resultDiv.style.opacity = '0';
            setTimeout(() => resultDiv.style.opacity = '1', 10);

            let feedbackText;
            if (hike < 10) feedbackText = "Low boom—grind harder!";
            else if (hike < 15) feedbackText = "Mid-tier boom—solid flex!";
            else if (hike < 20) feedbackText = "High boom—cashin’ in!";
            else feedbackText = "MEGA BOOM—raise royalty!";
            feedback.textContent = feedbackText + (position && location ? ` (${position} in ${location})` : '');

            shareButton.onclick = () => {
                const shareText = `I boomed a ${hike.toFixed(2)}% hike on HikeBoom! Spin yours: https://hikeboom.netlify.app/`;
                navigator.clipboard.writeText(shareText).then(() => alert('Boom copied—blast it everywhere!'));
            };
        });
    }

    // Peek toggles
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
            button.textContent = 'Peek';
        }
    }
});
