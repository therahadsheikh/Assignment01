// src/api.ts
const API_BASE = "/api-proxy"; 

const getHeaders = (withAuth = false) => {
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (withAuth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// --- AUTH FUNCTIONS ---

export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_BASE}/api/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation 
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Registration failed');
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const response = await fetch(`${API_BASE}/api/user`, { headers: getHeaders(true) });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.clear();
};

// --- POST FUNCTIONS ---

export const fetchPosts = async (page: number = 1) => {
  try {
    const response = await fetch(`${API_BASE}/api/posts?page=${page}`, { headers: getHeaders() });
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    return null;
  }
};

export const fetchSinglePost = async (id: string | number) => {
  const response = await fetch(`${API_BASE}/api/posts/${id}`, { headers: getHeaders() });
  return await response.json();
};

export const createPost = async (postData: any) => {
  const response = await fetch(`${API_BASE}/api/posts`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(postData),
  });
  return await response.json();
};

export const deletePost = async (id: any) => {
  await fetch(`${API_BASE}/api/posts/${id}`, { method: 'DELETE', headers: getHeaders(true) });
};

// --- COMMENT FUNCTIONS ---

export const createComment = async (postId: any, content: string) => {
  const response = await fetch(`${API_BASE}/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify({ content }),
  });
  return await response.json();
};

export const deleteComment = async (commentId: any) => {
  await fetch(`${API_BASE}/api/comments/${commentId}`, { 
    method: 'DELETE', 
    headers: getHeaders(true) 
  });
};