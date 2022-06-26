const newJobHandler = async (event) => {
    event.preventDefault();

    const jobTitle = document.querySelector('#job-title').value.trim();
    const jobDesc = document.querySelector('#job-desc').value.trim();
    const minsEarned = document.querySelector('#mins-earned').value.trim();
    const jobLocation = document.querySelector('#job-location').value.trim();
    console.log(jobTitle && jobDesc && minsEarned && jobLocation)
    if (jobTitle && jobDesc && minsEarned && jobLocation) {
        // Check route
        const response = await fetch(`/api/jobs`, {
            method: 'POST',
            body: JSON.stringify({ jobTitle, jobDesc, minsEarned, jobLocation }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create project');
        }
    }

};

document
    .querySelector('.post-job')
    .addEventListener('submit', newJobHandler);