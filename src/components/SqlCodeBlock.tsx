'use client';

import { useState } from 'react';
import { annualSalesSql } from '@/lib/sql-query';

const tokenPattern = /(\b(?:SELECT|FROM|GROUP BY|ORDER BY|ASC|AS|CASE|WHEN|THEN|END)\b|\b(?:YEAR|COUNT|SUM|ROUND)\b|\b(?:SalesOrderHeader|Sales)\b|\b(?:OnlineOrderFlag|OrderDate|TotalOrders|OnlineOrders|OfflineOrders|TotalRevenue|OnlineRevenue|OfflineRevenue|TotalDue|AverageValueOnlineOrders|AverageValueOfflineOrders|Freight|TotalFreight|TotalOnlineFreight|TotalOfflineFreight|FreightPercentage|AverageOrderValue|AverageOnlineOrderValue|AverageOfflineOrderValue)\b|\b\d+(?:\.\d+)?\b|\*)/gi;

function highlightSql(line: string) {
  return line.split(tokenPattern).map((part, index) => {
    if (!part) return null;
    const upper = part.toUpperCase();
    let color = '';
    if (/^(SELECT|FROM|GROUP BY|ORDER BY|ASC|AS|CASE|WHEN|THEN|END)$/i.test(part)) color = 'sql-token-keyword';
    else if (/^(YEAR|COUNT|SUM|ROUND)$/i.test(part)) color = 'sql-token-function';
    else if (/^(Sales|SalesOrderHeader)$/i.test(part)) color = 'sql-token-object';
    else if (/^\d/.test(part) || part === '*') color = 'sql-token-literal';
    else if (upper) color = 'sql-token-identifier';
    return <span className={color} key={`${index}-${part}`}>{part}</span>;
  });
}

export default function SqlCodeBlock({ copyLabel = 'Copy', copiedLabel = 'Copied' }: { copyLabel?: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyQuery() {
    try {
      await navigator.clipboard.writeText(annualSalesSql);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="sql-code-shell" dir="ltr">
      <div className="sql-code-toolbar">
        <span>SQL Server · T-SQL</span>
        <button type="button" onClick={copyQuery} className="sql-copy-button" aria-label={copied ? copiedLabel : copyLabel}>
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre className="sql-code-pre" aria-label="SQL query"><code>{annualSalesSql.split('\n').map((line, index) => (
        <span className="sql-code-line" key={index}><span className="sql-line-number" aria-hidden="true">{index + 1}</span><span>{highlightSql(line)}</span></span>
      ))}</code></pre>
    </div>
  );
}
