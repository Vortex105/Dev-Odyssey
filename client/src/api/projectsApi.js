const BASE_URL = 'http://localhost:5000/api/projects';

/**
 * Fetch all projects
 */
export async function getProjects() {
	const res = await fetch(BASE_URL);

	if (!res.ok) {
		throw new Error('Failed to fetch projects');
	}

	return res.json();
}

/**
 * Create a new project
 */
export async function createProject(projectData) {
	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(projectData),
	});

	if (!res.ok) {
		throw new Error('Failed to create project');
	}

	return res.json();
}

/**
 * Delete a project
 */
export async function deleteProject(id) {
	const res = await fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) {
		throw new Error('Failed to delete project');
	}

	return res.json();
}

export async function updateProject(id, updates) {
	const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updates),
	});

	if (!res.ok) {
		throw new Error('Failed to update project');
	}

	return res.json();
}
