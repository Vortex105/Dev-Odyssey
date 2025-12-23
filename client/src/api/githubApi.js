import axios from 'axios';

/**
 * Fetch repo details: latest commits, PRs, contributors
 * @param {string} repoUrl - full GitHub repo URL
 */
export const getGitHubData = async (repoUrl) => {
	try {
		if (!repoUrl) return null;

		// Extract owner/repo from URL
		const match = repoUrl.match(/github\.com\/([\w-]+)\/([\w-]+)/);
		if (!match) return null;

		const [_, owner, repo] = match;

		// Latest commit
		const commits = await axios.get(
			`https://api.github.com/repos/${owner}/${repo}/commits`
		);

		// Open PRs
		const prs = await axios.get(
			`https://api.github.com/repos/${owner}/${repo}/pulls?state=open`
		);

		// Contributors
		const contributors = await axios.get(
			`https://api.github.com/repos/${owner}/${repo}/contributors`
		);

		return {
			latestCommit: commits.data[0],
			openPRs: prs.data.length,
			contributors: contributors.data,
		};
	} catch (error) {
		console.error('GitHub API error:', error);
		return null;
	}
};
