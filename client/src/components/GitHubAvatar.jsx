export default function GitHubAvatar({ repoUrl }) {
  if (!repoUrl) return null;

  try {
    const url = new URL(repoUrl);
    const parts = url.pathname.split('/').filter(Boolean);

    // Expecting: /username/repo
    if (parts.length < 2) return null;

    const username = parts[0];
    const avatarUrl = `https://github.com/${username}.png`;

    return (
      <a
        href={repoUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
        title={username}
      >
        <img
          src={avatarUrl}
          alt={username}
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
        />
      </a>
    );
  } catch {
    return null;
  }
}
