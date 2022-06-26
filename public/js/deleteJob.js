const deleteHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/jobs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            deleteFailed.innerHTML = "Could not delete this job. Please try again";
        }
    }
};

const deleteBtns = document.querySelectorAll('.delete-btn');

for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', deleteHandler);
};

var deleteFailed = document.querySelector('#delete-failed');