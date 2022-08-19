import React, { useState } from "react";
import "./App.css";

// TODO: 도메인이 고정되지 않아서 야매로 우회
const origin_localhost = "http://127.0.0.1:3000";
const origin_prod = "https://hfvvhm9ua1.execute-api.ap-northeast-1.amazonaws.com";

function isLocalhost() {
  const val = window.location.hostname;
  return val.includes("127.0.0.1") || val.includes('localhost');
}
const endpoint = isLocalhost() ? origin_localhost : origin_prod;

function App() {
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<object | undefined>(undefined);
  const [error, setError] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const request = async (evt: React.MouseEvent) => {
    setLoading(true);
    setStatus(undefined);
    setResult(undefined);
    setError(undefined);

    try {
      // TODO: 더 멀쩡한 방법?
      const path = (evt.target as any).getAttribute("data-path");
      const url = `${endpoint}${path}`;
      const resp = await fetch(url, {
        method: "GET",
      });

      setStatus(resp.status);

      if (resp.status >= 400) {
        const text = await resp.text();
        setError(text);

      } else {
        const data = await resp.json();
        setResult(data);
      }

    } catch (e: any) {
      setError(e);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>shiroko demo</h1>

      <h2>rds</h2>
      <div>
        <button onClick={request} data-path="/rds/execute-statement">execute-statement</button>
      </div>

      <h2>redis</h2>
      <div>
        <button onClick={request} data-path="/redis/string">string</button>
      </div>

      <h2>sqs</h2>
      <div>
        <button>TODO</button>
      </div>

      <h2>sns</h2>
      <div>
        <button>TODO</button>
      </div>

      <h2>websocket</h2>
      <div>
        <button>TODO</button>
      </div>

      {loading && <h2>loading...</h2>}

      {result && <>
        <h2>result: {status}</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </>}

      {error && <>
        <h2>error: {status}</h2>
        <pre>{error}</pre>
      </>}
    </div>
  );
}

export default App;
