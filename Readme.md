Index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Google Sheet Cell Viewer & Editor</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    input, button { margin: 5px; padding: 8px; }
    #status { margin-top: 10px; color: green; }
  </style>
</head>
<body>
  <h2>📄 Google Sheet Cell Viewer & Editor</h2>

  <input id="cellInput" placeholder="Enter cell (e.g., A1)" />
  <br><br>

  <label>Cell Value:</label><br>
  <input id="cellValue" placeholder="Cell value will appear here..." />
  <br>
  <button onclick="updateCell()">Update</button>

  <p id="status"></p>

  <script>
    // 👇 Auto-fetch when cellInput changes
    document.getElementById('cellInput').addEventListener('input', async function () {
      const cell = this.value.trim().toUpperCase();
      if (!cell) return;

      try {
        const res = await fetch(`/getCell?cell=${cell}`);
        const data = await res.json();
        document.getElementById('cellValue').value = data.value || '';
      } catch (err) {
        console.error('❌ Fetch error:', err);
        document.getElementById('cellValue').value = '';
      }
    });

    // ✅ Update cell value
    async function updateCell() {
      const cell = document.getElementById('cellInput').value.trim().toUpperCase();
      const value = document.getElementById('cellValue').value;

      try {
        const res = await fetch('/updateCell', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cell, value })
        });
        const data = await res.json();
        document.getElementById('status').innerText = data.message || '✅ Updated!';
      } catch (err) {
        console.error('❌ Update error:', err);
        document.getElementById('status').innerText = '❌ Failed to update';
      }
    }
  </script>
</body>
</html>




server.js
const express = require('express');
const { google } = require('googleapis');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); // Serve index.html
app.use(bodyParser.json());         // Parse JSON body

const KEYFILEPATH = './sheet-reader-xyz123.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const SHEET_ID = '1qpC5ibaBdicT-huMOuIXWtBGDyRF3ovpKQZFMRYjGuk';
const auth = new google.auth.GoogleAuth({ keyFile: KEYFILEPATH, scopes: SCOPES });


// ✅ Get Cell Data
app.get('/getCell', async (req, res) => {
  const cell = req.query.cell; // e.g., A1

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `Sheet1!${cell}`,
    });

    const value = result.data.values ? result.data.values[0][0] : '';
    res.json({ value });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch cell value' });
  }
});


// ✅ Update Cell Data
app.post('/updateCell', async (req, res) => {
  const { cell, value } = req.body;

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `Sheet1!${cell}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[value]],
      },
    });

    res.json({ message: '✅ Updated successfully' });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Failed to update cell value' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
