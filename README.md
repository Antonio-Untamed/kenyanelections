(function () {
  if (window.__KE_API_SHIM__) return;
  window.__KE_API_SHIM__ = true;

  const STORAGE_KEY = 'kev27';
  const baseHeaders = { 'Content-Type': 'application/json' };

  async function apiLoad() {
    try {
      const res = await fetch('/api/state', { method: 'GET' });
      if (!res.ok) return null;
      const payload = await res.json();
      return payload && payload.state ? payload.state : null;
    } catch (err) {
      return null;
    }
  }

  async function apiSave(raw) {
    try {
      const res = await fetch('/api/state', {
        method: 'POST',
        headers: baseHeaders,
        body: JSON.stringify(raw)
      });
      if (!res.ok) return false;
      const payload = await res.json();
      return !!(payload && payload.ok);
    } catch (err) {
      return false;
    }
  }

  const realSetItem = Storage.prototype.setItem;
  const realGetItem = Storage.prototype.getItem;

  Storage.prototype.getItem = function (key) {
    if (key === STORAGE_KEY) {
      const localValue = realGetItem.call(this, key);
      if (localValue) return localValue;
      return (async () => {
        const remoteState = await apiLoad();
        if (remoteState) {
          realSetItem.call(this, key, JSON.stringify(remoteState));
        }
        return remoteState ? JSON.stringify(remoteState) : null;
      })();
    }
    return realGetItem.call(this, key);
  };

  Storage.prototype.setItem = function (key, value) {
    if (key === STORAGE_KEY) {
      try {
        const parsed = JSON.parse(value);
        apiSave(parsed);
      } catch (err) {
        // ignore malformed state
      }
    }
    return realSetItem.call(this, key, value);
  };

  window.KEAPI = {
    loadState: apiLoad,
    saveState: apiSave,
    sync: async function () {
      const localValue = localStorage.getItem(STORAGE_KEY);
      if (localValue) {
        await apiSave(JSON.parse(localValue));
      }
      const remoteState = await apiLoad();
      if (remoteState) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteState));
      }
      return remoteState;
    }
  };
})();
