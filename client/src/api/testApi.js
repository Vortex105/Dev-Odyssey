export async function testBackend() {
	const res = await fetch('http://localhost:5000/');
	return res.json();
}
