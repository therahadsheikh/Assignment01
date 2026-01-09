// src/api.ts

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

const getHeaders = (withAuth = false) => {
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  if (withAuth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const fetchPosts = async (page: number = 1) => {
  try {
    const response = await fetch(`/api/posts?page=${page}`, { headers: getHeaders() });
    return await response.json();
  } catch (err) {
    console.error(getErrorMessage(err));
    return null;
  }
};

export const fetchSinglePost = async (id: string | number) => {
  try {
    const response = await fetch(`/api/posts/${id}`, { headers: getHeaders() });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Post not found');
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
};

export const createPost = async (postData: { title: string; content: string }) => {
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed');
    return data;
  } catch (err) { throw new Error(getErrorMessage(err)); }
};

export const createComment = async (postId: number | string, content: string) => {
  try {
    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed');
    return data;
  } catch (err) { throw new Error(getErrorMessage(err)); }
};

export const deleteComment = async (commentId: number | string) => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error('Delete failed');
    return true;
  } catch (err) { throw new Error(getErrorMessage(err)); }
};

export const deletePost = async (postId: number | string) => {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return true;
  } catch (err) { throw new Error(getErrorMessage(err)); }
};

export const loginUser = async (credentials: any) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (err) { throw new Error(getErrorMessage(err)); }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return data;
  } catch (err) { throw new Error(getErrorMessage(err)); }
};

export const logoutUser = async () => {
  try {
    await fetch('/api/logout', { method: 'POST', headers: getHeaders(true) });
  } finally {
    localStorage.clear();
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch('/api/user', { headers: getHeaders(true) });
    const data = await response.json();
    if (response.ok) localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch { return null; }
};