
export interface SheetRow {
  [key: string]: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  email: {
    sent: number;
    replied: number;
    idle: number;
    followUps: number;
    failed: number;
  };
  leads: SheetRow[];
  isError?: boolean;
}

const SHEET_ID = '1InGde6jLM_w5KP3rAYThvYQgLpL6uCvdUFRykoYWa7o';
const GID = '831213677';
const GOOGLE_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

const PROXIES = [
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => `https://thingproxy.freeboard.io/fetch/${url}`
];

export const fetchSheetData = async (): Promise<DashboardMetrics> => {
  let lastError;

  // Try direct fetch first
  try {
    const response = await fetch(GOOGLE_CSV_URL, { signal: AbortSignal.timeout(5000) });
    if (response.ok) {
      const text = await response.text();
      if (!text.trim().startsWith('<!DOCTYPE')) {
        return calculateMetrics(parseCSV(text));
      }
    }
  } catch (e) {
    // Continue
  }

  for (const proxy of PROXIES) {
    try {
      const proxyUrl = proxy(GOOGLE_CSV_URL);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(proxyUrl, { 
        signal: controller.signal,
        headers: { 'Accept': 'text/csv' }
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const text = await response.text();
      
      if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
        throw new Error('Received HTML');
      }
      
      const rows = parseCSV(text);
      return calculateMetrics(rows);
    } catch (error: any) {
      lastError = error;
    }
  }

  return {
    totalLeads: 0,
    email: { sent: 0, replied: 0, idle: 0, followUps: 0, failed: 0 },
    leads: [],
    isError: true
  };
};

const parseCSV = (text: string): SheetRow[] => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  
  const parsedRows: SheetRow[] = [];
  
  for (let j = 1; j < lines.length; j++) {
    const line = lines[j];
    const values: string[] = [];
    let inQuote = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        values.push(currentValue.trim().replace(/^"|"$/g, ''));
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim().replace(/^"|"$/g, ''));

    const row: SheetRow = {};
    let hasValidLeadData = false;
    headers.forEach((header, index) => {
      const val = values[index] || '';
      row[header] = val;
      
      const headLower = header.toLowerCase();
      // Strict Lead Identification: Must have an email with an '@' OR a non-empty name
      if (val.trim() !== '') {
        if (headLower.includes('email') && val.includes('@')) {
          hasValidLeadData = true;
        }
        // If we can't find an email, we still might count it if it has a name, 
        // but often sheets have thousands of "empty" name rows. 
        // Let's stick mostly to Email presence for "Outreach" leads.
      }
    });

    if (hasValidLeadData) {
      parsedRows.push(row);
    }
  }
  
  return parsedRows;
};

const calculateMetrics = (rows: SheetRow[]): DashboardMetrics => {
  const metrics: DashboardMetrics = {
    totalLeads: rows.length,
    email: { sent: 0, replied: 0, idle: 0, followUps: 0, failed: 0 },
    leads: rows
  };

  rows.forEach(row => {
    // Email Status (Column: "E-Status")
    const eStatus = (row['E-Status'] || row['Status'] || '').toLowerCase();
    const fStatus = (row['Follow_Up_Status'] || '').toLowerCase();

    if (eStatus.includes('replied') || eStatus.includes('response')) {
      metrics.email.replied++;
    } else if (fStatus.includes('sent')) {
      metrics.email.followUps++;
    } else if (eStatus.includes('sent') || eStatus.includes('success')) {
      metrics.email.sent++;
    } else if (eStatus.includes('fail') || eStatus.includes('error')) {
      metrics.email.failed++;
    } else {
      metrics.email.idle++;
    }
  });

  return metrics;
};
