document.addEventListener('DOMContentLoaded', () => {
    console.log('HikeBoom loaded at', new Date().toLocaleTimeString());

    const form = document.getElementById('appraisalForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted');

            const lastCtc = parseFloat(document.getElementById('lastCtc').value);
            const currentCtc = parseFloat(document.getElementById('currentCtc').value);
            let position = document.getElementById('position').value.trim().toLowerCase();
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

            let feedbackText, nextStepsOptions;

            // Role-based advice
            const isEngineer = position.includes('engineer') || position.includes('developer');
            const isManager = position.includes('manager') || position.includes('lead');
            const isDesigner = position.includes('design') || position.includes('ux');

            if (hike < 10) {
                feedbackText = "Below average—there’s potential ahead!";
                nextStepsOptions = [
                    isEngineer ? "Polish your coding skills with a new project or certification—your next hike could soar!" :
                    isManager ? "Focus on leadership training or team wins—your impact will shine through!" :
                    isDesigner ? "Build a standout portfolio piece—your creativity deserves a bigger stage!" :
                    "Upskill with a course or take on a high-visibility project—your worth is about to rise!",
                    "Talk to your manager about growth opportunities—you’ve got this in the bag!",
                    "Network internally for a bigger role—your next step is closer than you think!"
                ];
            } else if (hike < 15) {
                feedbackText = "Average hike—solid ground to build on!";
                nextStepsOptions = [
                    isEngineer ? "Dive into a trending tech stack—your skills are your ticket to more!" :
                    isManager ? "Mentor a teammate or lead a new initiative—your leadership is growing!" :
                    isDesigner ? "Experiment with bold designs—your next review could be a masterpiece!" :
                    "Take on a stretch goal or side hustle—your momentum is picking up!",
                    "Ask for feedback to fine-tune your edge—you’re on the right track!",
                    "Save a chunk of this raise—future you will thank you!"
                ];
            } else if (hike < 20) {
                feedbackText = "Good hike—your hard work’s paying off!";
                nextStepsOptions = [
                    isEngineer ? "Contribute to open source or mentor juniors—your expertise is gold!" :
                    isManager ? "Pitch a big idea to execs—your vision’s ready to shine!" :
                    isDesigner ? "Lead a design sprint—your flair’s about to level up!" :
                    "Invest this raise wisely—build a safety net or dream fund!",
                    "Set a bold career goal—your trajectory’s looking strong!",
                    "Celebrate, then aim for a promotion—you’re crushing it!"
                ];
            } else {
                feedbackText = "Excellent hike—you’re a star!";
                nextStepsOptions = [
                    isEngineer ? "Build something groundbreaking—your skills are top-tier!" :
                    isManager ? "Shape company strategy—your leadership’s unstoppable!" :
                    isDesigner ? "Redefine the brand—your creativity’s on fire!" :
                    "Negotiate equity or a bigger role—your value’s sky-high!",
                    "Teach others your secrets—your success inspires!",
                    "Treat yourself, then dream bigger—you’re just getting started!"
                ];
            }

            feedback.textContent = feedbackText + (position && location ? ` (For ${position} in ${location})` : '');
            nextSteps.textContent = nextStepsOptions[Math.floor(Math.random() * nextStepsOptions.length)];
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
