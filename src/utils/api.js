// Replace with your actual Render backend URL (make sure there is NO trailing slash at the end)
const API_BASE_URL = 'https://employeedasboard-back-rmd9.onrender.com/api';

export async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw new Error(
      error.message === 'Failed to fetch'
        ? 'Unable to connect to the server. Please ensure the backend is running.'
        : `Failed to load tasks: ${error.message}`
    );
  }
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Backend server is not reachable');
  }
}