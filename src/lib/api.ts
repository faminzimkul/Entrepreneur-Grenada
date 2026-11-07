import type { Article } from '../data/articles';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const TOKEN_KEY = 'eg_admin_token';

export const apiConfigured = Boolean(API_BASE_URL);
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (token: string | null) => token ? sessionStorage.setItem(TOKEN_KEY, token) : sessionStorage.removeItem(TOKEN_KEY);

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_BASE_URL) throw new Error('API is not connected yet. Set VITE_API_BASE_URL when your PHP API is deployed.');
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body) headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || `Request failed (${response.status})`);
  return payload as T;
}

export type ArticleInput = Omit<Article, 'id'> & { id?: string; status: 'draft' | 'published'; coverImage?: string };
export const api = {
  login: (email: string, password: string) => request<{token:string;user:{email:string}}>('/api/admin/login', {method:'POST', body:JSON.stringify({email,password})}),
  me: () => request<{user:{email:string}}>('/api/admin/me'),
  logout: () => request<{message:string}>('/api/admin/logout', {method:'POST'}),
  adminArticles: () => request<{articles:ArticleInput[]}>('/api/admin/articles'),
  createArticle: (article: ArticleInput) => request<{article:ArticleInput}>('/api/admin/articles', {method:'POST',body:JSON.stringify(article)}),
  updateArticle: (id:string, article:ArticleInput) => request<{article:ArticleInput}>(`/api/admin/articles/${encodeURIComponent(id)}`, {method:'PUT',body:JSON.stringify(article)}),
  deleteArticle: (id:string) => request<{message:string}>(`/api/admin/articles/${encodeURIComponent(id)}`, {method:'DELETE'}),
  publicArticles: () => request<{articles:Article[]}>('/api/articles'),
};
