// Function to handle form submission and fetch data
async function get() {
    // Collect the data from the input
    const uniqueId = document.getElementById('po1').value;

    // Validate the input data
    if (!uniqueId) { // Validate for uniqueId
        alert('UniqueId is required!');
        return;
    }

    // Fetch the drive info from backend using the entered uniqueId
    try {
        const response = await fetch(`https://myspringboot-10.onrender.com/api/driveinfo/unique/${uniqueId}`, {
            method: 'GET', // GET request to fetch the data
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Parse the response to JSON
            const driveInfo = await response.json();
            
            // Show the fetched data
            if (driveInfo) {
                document.getElementById('b1').innerHTML = `
                    <p>Uploader Name: ${driveInfo.uploaderName}</p>
                    <p>UniqueId: ${driveInfo.uniqueId}</p>
                    <p>Drive Link: <a href="${driveInfo.driveLink}" target="_blank">${driveInfo.driveLink}</a></p>
                `;
            } else {
                document.getElementById('b1').innerHTML = `<p>No data found for the entered UniqueId.</p>`;
            }
        } else {
            // Handle error
            document.getElementById('b1').innerHTML = `<p>Error fetching data. Please try again.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('b1').innerHTML = `<p>Network error. Please try again later.</p>`;
    }
}
