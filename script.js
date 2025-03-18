document.addEventListener('DOMContentLoaded', () => {
    console.log('HikeBoom loaded at', new Date().toLocaleTimeString());

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
            const whatsNext = document.getElementById('whatsNext');
            const nextSteps = document.getElementById('nextSteps');

            let spins = 0;
            const spinInterval = setInterval(() => {
                hikePercentage.textContent = (Math.random() * 100).toFixed(2);
                spins++;
                if (spins >= 10) {
                    clearInterval(spinInterval);
                    hikePercentage.textContent = hike.toFixed(2);
                    hikePercentage.style.animation = 'none';
                }
            }, 100);

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            resultDiv.style.display = 'block';
            resultDiv.style.opacity = '0';
            setTimeout(() => resultDiv.style.opacity = '1', 10);

            gauge.innerHTML = `<div style="width: ${Math.min(hike, 100)}%;"></div>`;

            let feedbackText, nextStepsText;
            if (hike < 10) {
                feedbackText = "Below average—room for improvement.";
                nextStepsText = "Consider negotiating with your manager or upskilling with a course to boost your value.";
            } else if (hike < 15) {
                feedbackText = "Average hike—steady performance.";
                nextStepsText = "Keep up the good work and explore side projects to stand out next time.";
            } else if (hike < 20) {
                feedbackText = "Good hike—well done!";
                nextStepsText = "Leverage this raise to invest in professional growth or savings.";
            } else {
                feedbackText = "Excellent hike—top-tier result!";
                nextStepsText = "Celebrate, then aim higher—maybe a leadership role or new challenge.";
            }
            feedback.textContent = feedbackText + (position && location ? ` (For ${position} in ${location})` : '');
            nextSteps.textContent = nextStepsText;
            whatsNext.style.display = 'block';
        });
    }

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
