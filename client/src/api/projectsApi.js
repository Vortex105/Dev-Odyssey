const BASE_URL = process.env.BACKEND_URL;

// Helper function to get the token from localStorage
function getAuthToken() {
	return localStorage.getItem('token');
}

/**
 * Fetch all projects
 */
export async function getProjects() {
	const token = getAuthToken();

	const res = await fetch(BASE_URL, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		if (res.status === 401) {
			throw new Error('Authentication required. Please log in.');
		}
		throw new Error('Failed to fetch projects');
	}

	return res.json();
}

/**
 * Create a new project
 */
export async function createProject(projectData) {
	const token = getAuthToken();

	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(projectData),
	});

	if (!res.ok) {
		if (res.status === 401) {
			throw new Error('Authentication required. Please log in.');
		}
		throw new Error('Failed to create project');
	}

	return res.json();
}

/**
 * Delete a project
 */
export async function deleteProject(id) {
	const token = getAuthToken();

	const res = await fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		if (res.status === 401) {
			throw new Error('Authentication required. Please log in.');
		}
		throw new Error('Failed to delete project');
	}

	return res.json();
}

export async function updateProject(id, updates) {
	const token = getAuthToken();

	const res = await fetch(`${BASE_URL}/${id}`, {
		method: 'PATCH', // Changed from PUT to PATCH as per backend implementation
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(updates),
	});

	if (!res.ok) {
		if (res.status === 401) {
			throw new Error('Authentication required. Please log in.');
		}
		throw new Error('Failed to update project');
	}

	return res.json();
}
