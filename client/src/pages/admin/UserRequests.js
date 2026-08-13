// src/pages/admin/UserRequests.js
// Real customer contact inbox: lists messages from /api/marketing/contacts,
// mark as read, delete.
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MailOpen, Trash2, RefreshCw, MessageSquare } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const fmtDate = (iso) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
};

const UserRequests = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi('/marketing/contacts');
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const flash = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const markRead = async (c) => {
    if (c.read) return;
    try {
      await adminApi(`/marketing/contacts/${c.id}`, { method: 'PUT' });
      flash('Marked as read');
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (c) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await adminApi(`/marketing/contacts/${c.id}`, { method: 'DELETE' });
      flash('Message deleted');
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Customer Requests / Contact Messages</h2>
          <p className="text-sm text-muted-foreground">{messages.length} message(s)</p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {message && <div className="mb-4 rounded border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">{message}</div>}
      {error && <div className="mb-4 rounded border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}

      <div className="space-y-4">
        {messages.map((c) => (
          <div
            key={c.id}
            className={`rounded-lg border p-4 ${c.read ? 'border-border bg-card' : 'border-primary/40 bg-primary/5'}`}
          >
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  {c.read ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                  <h4 className="font-medium text-foreground">{c.name}</h4>
                  <span className="text-xs text-muted-foreground" dir="ltr">· {c.email}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{fmtDate(c.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                {!c.read && (
                  <button onClick={() => markRead(c)} className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs hover:bg-muted">
                    Mark read
                  </button>
                )}
                <button onClick={() => remove(c)} className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
            {c.subject && <p className="mb-1 text-sm font-medium text-foreground">{c.subject}</p>}
            <p className="text-sm text-muted-foreground">{c.message}</p>
          </div>
        ))}
        {!loading && messages.length === 0 && (
          <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-card p-12 text-center">
            <MessageSquare className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRequests;
